using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Documentation",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Notes = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Documentation", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Header",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    HeaderId = table.Column<string>(type: "TEXT", nullable: true),
                    Title = table.Column<string>(type: "TEXT", nullable: true),
                    Type = table.Column<string>(type: "TEXT", nullable: true),
                    Impact = table.Column<string>(type: "TEXT", nullable: true),
                    Urgency = table.Column<string>(type: "TEXT", nullable: true),
                    Priority = table.Column<string>(type: "TEXT", nullable: true),
                    Status = table.Column<string>(type: "TEXT", nullable: true),
                    CreatedTimestamp = table.Column<long>(type: "INTEGER", nullable: false),
                    InProgress = table.Column<bool>(type: "INTEGER", nullable: false),
                    Validation = table.Column<bool>(type: "INTEGER", nullable: false),
                    Closed = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Header", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Raci",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ResponsibleParties = table.Column<string>(type: "TEXT", nullable: true),
                    AccountableParties = table.Column<string>(type: "TEXT", nullable: true),
                    ConsultedParties = table.Column<string>(type: "TEXT", nullable: true),
                    InformedParties = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Raci", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Timeline",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    CreationTimestamp = table.Column<long>(type: "INTEGER", nullable: true),
                    InProgressTimestamp = table.Column<long>(type: "INTEGER", nullable: true),
                    ValidationTimestamp = table.Column<long>(type: "INTEGER", nullable: true),
                    ClosedTimestamp = table.Column<long>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Timeline", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Incident",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    HeaderId = table.Column<int>(type: "INTEGER", nullable: true),
                    RaciId = table.Column<int>(type: "INTEGER", nullable: true),
                    TimelineId = table.Column<int>(type: "INTEGER", nullable: true),
                    DocumentationId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Incident", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Incident_Documentation_DocumentationId",
                        column: x => x.DocumentationId,
                        principalTable: "Documentation",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Incident_Header_HeaderId",
                        column: x => x.HeaderId,
                        principalTable: "Header",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Incident_Raci_RaciId",
                        column: x => x.RaciId,
                        principalTable: "Raci",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Incident_Timeline_TimelineId",
                        column: x => x.TimelineId,
                        principalTable: "Timeline",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Incident_DocumentationId",
                table: "Incident",
                column: "DocumentationId");

            migrationBuilder.CreateIndex(
                name: "IX_Incident_HeaderId",
                table: "Incident",
                column: "HeaderId");

            migrationBuilder.CreateIndex(
                name: "IX_Incident_RaciId",
                table: "Incident",
                column: "RaciId");

            migrationBuilder.CreateIndex(
                name: "IX_Incident_TimelineId",
                table: "Incident",
                column: "TimelineId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Incident");

            migrationBuilder.DropTable(
                name: "Documentation");

            migrationBuilder.DropTable(
                name: "Header");

            migrationBuilder.DropTable(
                name: "Raci");

            migrationBuilder.DropTable(
                name: "Timeline");
        }
    }
}
