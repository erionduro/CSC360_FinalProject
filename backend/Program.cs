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


app.Run();

