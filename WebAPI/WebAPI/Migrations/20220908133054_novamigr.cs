using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class novamigr : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Klupa_SalaId",
                table: "Klupa",
                column: "SalaId");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Klupa_Sala_SalaId",
                table: "Klupa");

            migrationBuilder.DropIndex(
                name: "IX_Klupa_SalaId",
                table: "Klupa");
        }
    }
}
