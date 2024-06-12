using System.Text.Json;
using DBIncidents;
using Microsoft.EntityFrameworkCore;

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
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<IncidentContext>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseCors("AllowAllOrigins");

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
    var insertedIncident = await context.Incident
                                        .Include(i => i.Header)
                                        .Include(i => i.Raci)
                                        .Include(i => i.Timeline)
                                        .Include(i => i.Documentation)
                                        .FirstOrDefaultAsync(i => i.Header.HeaderId == newIncident.Header.HeaderId);
    Console.WriteLine($"Inserted Incident: {JsonSerializer.Serialize(insertedIncident)}");

    return Results.Ok(newIncident);
})
.WithName("CreateIncident")
.WithOpenApi();

app.MapPut("/incidents/{id}", async (string id, Incident updatedIncident, IncidentContext context) =>
{
    var incident = await context.Incident.Include(i => i.Header)
                                         .Include(i => i.Raci)
                                         .Include(i => i.Timeline)
                                         .Include(i => i.Documentation)
                                         .FirstOrDefaultAsync(i => i.Header.HeaderId == id);

    if (incident != null)
    {
        incident.Header = updatedIncident.Header;
        incident.Raci = updatedIncident.Raci;
        incident.Timeline = updatedIncident.Timeline;
        incident.Documentation = updatedIncident.Documentation;

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