using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class izmjena : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SalaId",
                table: "Filmovi");

            migrationBuilder.CreateTable(
                name: "FilmoviSala",
                columns: table => new
                {
                    SalaId = table.Column<int>(type: "int", nullable: false),
                    FilmoviId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FilmoviSala", x => new { x.SalaId, x.FilmoviId });
                    table.ForeignKey(
                        name: "FK_FilmoviSala_Filmovi_FilmoviId",
                        column: x => x.FilmoviId,
                        principalTable: "Filmovi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FilmoviSala_Sala_SalaId",
                        column: x => x.SalaId,
                        principalTable: "Sala",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FilmoviSala_FilmoviId",
                table: "FilmoviSala",
                column: "FilmoviId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FilmoviSala");

            migrationBuilder.AddColumn<int>(
                name: "SalaId",
                table: "Filmovi",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
