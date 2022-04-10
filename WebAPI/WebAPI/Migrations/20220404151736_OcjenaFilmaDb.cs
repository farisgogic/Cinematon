using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class OcjenaFilmaDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "OcjenaFilma",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ocjena = table.Column<int>(type: "int", nullable: false),
                    FilmoviId = table.Column<int>(type: "int", nullable: false),
                    KorisnikId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OcjenaFilma", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OcjenaFilma_AspNetUsers_KorisnikId",
                        column: x => x.KorisnikId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OcjenaFilma_Filmovi_FilmoviId",
                        column: x => x.FilmoviId,
                        principalTable: "Filmovi",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OcjenaFilma_FilmoviId",
                table: "OcjenaFilma",
                column: "FilmoviId");

            migrationBuilder.CreateIndex(
                name: "IX_OcjenaFilma_KorisnikId",
                table: "OcjenaFilma",
                column: "KorisnikId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OcjenaFilma");
        }
    }
}
