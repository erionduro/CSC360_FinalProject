using Incidents;
using System.Text.Json;
using System.IO;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options => {
    options.AddPolicy("AllowAllOrigins", builder => {
        builder.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseCors("AllowAllOrigins");

//--------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------

app.MapGet("/incidents", () => {
    var incidentsJson = System.IO.File.ReadAllText("incidentDB.json");
    var incidentDB = JsonSerializer.Deserialize<List<Incident>>(incidentsJson);

    Console.Write(incidentDB);

    if (incidentDB != null){
        return Results.Ok(incidentDB);
    }
    else {
        return Results.NotFound();
    }
})
.WithName("HelloWorld")
.WithOpenApi();

app.MapPost("/incidents", async (Incident newIncident) => {
    var incidentsJson = await System.IO.File.ReadAllTextAsync("incidentDB.json");
    var incidentDB = JsonSerializer.Deserialize<List<Incident>>(incidentsJson);

    if (incidentDB != null)
    {
        incidentDB.Add(newIncident);
        await System.IO.File.WriteAllTextAsync("incidentDB.json", JsonSerializer.Serialize(incidentDB, new JsonSerializerOptions { WriteIndented = true }));
        return Results.Ok(newIncident);
    }
    else
    {
        return Results.NotFound();
    }
})
.WithName("CreateIncident")
.WithOpenApi();

app.MapPut("/incidents/{id}", async (string id, Incident updatedIncident) => {
    var incidentsJson = await System.IO.File.ReadAllTextAsync("incidentDB.json");
    var incidentDB = JsonSerializer.Deserialize<List<Incident>>(incidentsJson);

    if (incidentDB != null)
    {
        var incidentIndex = incidentDB.FindIndex(incident => incident.header.id == id);
        if (incidentIndex != -1)
        {
            incidentDB[incidentIndex] = updatedIncident;
            await System.IO.File.WriteAllTextAsync("incidentDB.json", JsonSerializer.Serialize(incidentDB, new JsonSerializerOptions { WriteIndented = true }));
            return Results.Ok(updatedIncident);
        }
        else
        {
            return Results.NotFound();
        }
    }
    else
    {
        return Results.NotFound();
    }
})
.WithName("UpdateIncident")
.WithOpenApi();

app.Run();

