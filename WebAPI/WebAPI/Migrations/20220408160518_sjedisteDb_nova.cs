using Microsoft.EntityFrameworkCore.Migrations;

namespace WebAPI.Migrations
{
    public partial class sjedisteDb_nova : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rezervacija_Filmovi_FilmoviId1",
                table: "Rezervacija");

            migrationBuilder.DropIndex(
                name: "IX_Rezervacija_FilmoviId1",
                table: "Rezervacija");

            migrationBuilder.DropColumn(
                name: "FilmoviId1",
                table: "Rezervacija");

            migrationBuilder.AlterColumn<int>(
                name: "FilmoviId",
                table: "Rezervacija",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rezervacija_FilmoviId",
                table: "Rezervacija",
                column: "FilmoviId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rezervacija_Filmovi_FilmoviId",
                table: "Rezervacija",
                column: "FilmoviId",
                principalTable: "Filmovi",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rezervacija_Filmovi_FilmoviId",
                table: "Rezervacija");

            migrationBuilder.DropIndex(
                name: "IX_Rezervacija_FilmoviId",
                table: "Rezervacija");

            migrationBuilder.AlterColumn<string>(
                name: "FilmoviId",
                table: "Rezervacija",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "FilmoviId1",
                table: "Rezervacija",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rezervacija_FilmoviId1",
                table: "Rezervacija",
                column: "FilmoviId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Rezervacija_Filmovi_FilmoviId1",
                table: "Rezervacija",
                column: "FilmoviId1",
                principalTable: "Filmovi",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
