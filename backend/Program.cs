using System.Text.Json;
using DBIncidents;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddAuthorization();
builder.Services.AddSwaggerGen(c =>
{
    // Define the Basic Authentication scheme
    c.AddSecurityDefinition("basic", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "basic",
        In = ParameterLocation.Header,
        Description = "Basic Authentication header using the Bearer scheme."
    });

    // Specify that all operations require the Basic Authentication scheme
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "basic"
                }
            },
            new string[] {}
        }
    });
});builder.Services.AddDbContext<IncidentContext>();
builder.Services.AddAuthentication("BasicAuthentication")
    .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("BasicAuthentication", null);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseCors("AllowAllOrigins");
app.UseAuthentication();
app.UseAuthorization();
// Initialize the database
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<IncidentContext>();
    db.Database.EnsureCreated();
}

app.MapGet("/incidents", async (HttpContext context) =>
{
    try
    {
        var incidentContext = context.RequestServices.GetRequiredService<IncidentContext>();

        if (!incidentContext.Incident.Any())
        {
            var jsonOptions = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            var incidentsJson = await File.ReadAllTextAsync("incidentDB.json");
            Incident[]? incidents = JsonSerializer.Deserialize<Incident[]>(incidentsJson, jsonOptions);

            if (incidents != null)
            {
                incidentContext.Incident.AddRange(incidents);
                await incidentContext.SaveChangesAsync();
            }
        }

        var retrievedIncidents = await incidentContext.Incident
                                                     .Include(i => i.Header)
                                                     .Include(i => i.Raci)
                                                     .Include(i => i.Timeline)
                                                     .Include(i => i.Documentation)
                                                     .ToListAsync();

        return Results.Ok(retrievedIncidents);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error: {ex.Message}");
        return Results.Problem("An error occurred while processing your request.");
    }
})
.WithName("GetIncidents")
.WithOpenApi()
.WithMetadata(new Microsoft.AspNetCore.Mvc.ApplicationModels.PageConventionCollection());

app.MapPost("/login", async (HttpRequest request, IncidentContext context) =>
{
    if (!request.Headers.ContainsKey("Authorization"))
    {
        return Results.Unauthorized();
    }

    var authHeader = System.Net.Http.Headers.AuthenticationHeaderValue.Parse(request.Headers["Authorization"]);
    var credentialBytes = Convert.FromBase64String(authHeader.Parameter);
    var credentials = System.Text.Encoding.UTF8.GetString(credentialBytes).Split(':', 2);
    var username = credentials[0];
    var password = credentials[1];

    var user = await context.Set<User>().SingleOrDefaultAsync(u => u.Username == username);
    if (user == null || !VerifyPasswordHash(password, user.PasswordHash))
    {
        return Results.Unauthorized();
    }

    return Results.Ok("Login successful");
});

// Define the VerifyPasswordHash method
bool VerifyPasswordHash(string password, string storedHash)
{
    // Add your password verification logic here
    // For example, you can use a hashing algorithm to compare the stored hash with the hash of the provided password
    // Return true if the password is valid, false otherwise
    return true;
};

app.MapPost("/register", async (User newUser, IncidentContext context) =>
{
    byte[] salt = new byte[128 / 8];
    using (var rng = RandomNumberGenerator.Create())
    {
        rng.GetBytes(salt);
    }

    string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
        password: newUser.PasswordHash,
        salt: salt,
        prf: KeyDerivationPrf.HMACSHA1,
        iterationCount: 10000,
        numBytesRequested: 256 / 8));

    newUser.PasswordHash = hashed;

    context.Set<User>().Add(newUser);
    await context.SaveChangesAsync();

    return Results.Ok(newUser);
})
.WithName("RegisterUser")
.WithOpenApi();

app.MapPost("/incidents", async (Incident newIncident, IncidentContext context) =>
{
    context.Incident.Add(newIncident);
    await context.SaveChangesAsync();

    // Log the inserted incident for debugging
    return Results.Ok(newIncident);
})
.WithName("CreateIncident")
.WithOpenApi().RequireAuthorization(new AuthorizeAttribute() {AuthenticationSchemes="BasicAuthentication"});

app.MapPut("/incidents/{id}", async (int id, Incident updatedIncident, IncidentContext context) =>
{
    var incident = await context.Incident.Include(i => i.Header)
                                         .Include(i => i.Raci)
                                         .Include(i => i.Timeline)
                                         .Include(i => i.Documentation)
                                         .Cast<Incident>() // Cast to the appropriate type
                                         .SingleOrDefaultAsync(i => i.Header.Id == id);

    if (incident != null)
    {
        // Update the properties of the existing entity
        if (incident.Header != null && updatedIncident.Header != null)
        {
            incident.Header.Title = updatedIncident.Header.Title;
            incident.Header.Type = updatedIncident.Header.Type;
            incident.Header.Impact = updatedIncident.Header.Impact;
            incident.Header.Urgency = updatedIncident.Header.Urgency;
            incident.Header.Priority = updatedIncident.Header.Priority;
            incident.Header.Status = updatedIncident.Header.Status;
            incident.Header.CreatedTimestamp = updatedIncident.Header.CreatedTimestamp;
            incident.Header.InProgress = updatedIncident.Header.InProgress;
            incident.Header.Validation = updatedIncident.Header.Validation;
            incident.Header.Closed = updatedIncident.Header.Closed;
        }

        if (incident.Raci != null && updatedIncident.Raci != null)
        {
            incident.Raci.ResponsibleParties = updatedIncident.Raci.ResponsibleParties;
            incident.Raci.AccountableParties = updatedIncident.Raci.AccountableParties;
            incident.Raci.ConsultedParties = updatedIncident.Raci.ConsultedParties;
            incident.Raci.InformedParties = updatedIncident.Raci.InformedParties;
        }

        if (incident.Timeline != null && updatedIncident.Timeline != null)
        {
            incident.Timeline.CreationTimestamp = updatedIncident.Timeline.CreationTimestamp;
            incident.Timeline.InProgressTimestamp = updatedIncident.Timeline.InProgressTimestamp;
            incident.Timeline.ValidationTimestamp = updatedIncident.Timeline.ValidationTimestamp;
            incident.Timeline.ClosedTimestamp = updatedIncident.Timeline.ClosedTimestamp;
        }

        if (incident.Documentation != null && updatedIncident.Documentation != null)
        {
            incident.Documentation.Description = updatedIncident.Documentation.Description;
            incident.Documentation.Notes = updatedIncident.Documentation.Notes;
        }

        // Save changes to the database
        await context.SaveChangesAsync();

        return Results.Ok(updatedIncident);
    }
    else
    {
        return Results.NotFound();
    }
})
.WithName("UpdateIncident")
.WithOpenApi();

app.Run();