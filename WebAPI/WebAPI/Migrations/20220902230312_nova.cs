using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class nova : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.CreateTable(
                name: "Klupa",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    red = table.Column<int>(type: "int", nullable: false),
                    kolona = table.Column<int>(type: "int", nullable: false),
                    korisnikId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    zauzeto = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Klupa", x => x.id);
                    table.ForeignKey(
                        name: "FK_Klupa_AspNetUsers_korisnikId",
                        column: x => x.korisnikId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Klupa_korisnikId",
                table: "Klupa",
                column: "korisnikId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Klupa");

            migrationBuilder.DropColumn(
                name: "Cijena",
                table: "Filmovi");
        }
    }
}
