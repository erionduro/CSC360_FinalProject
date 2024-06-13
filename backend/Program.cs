using System.Text.Json;
using DBIncidents;
using Microsoft.EntityFrameworkCore;
using backend;
using Microsoft.AspNetCore.Authentication;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authorization;

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

app.MapGet("/incidents", async (IncidentContext context) =>
{
    try
    {
        if (!context.Incident.Any())
        {
            var jsonOptions = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };
            var incidentsJson = await File.ReadAllTextAsync("incidentDB.json");
            Incident[]? incidents = JsonSerializer.Deserialize<Incident[]>(incidentsJson, jsonOptions);

            if (incidents != null)
            {
                context.Incident.AddRange(incidents);
                await context.SaveChangesAsync();
            }
        }

        var retrievedIncidents = await context.Incident
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
                                         .FirstOrDefaultAsync(i => i.Header.Id == id);

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