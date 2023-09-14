using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class RemoveForeignKeyToStatusTbls : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_ActivityStatuses_Status",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_ActivityComments_ActivityCommentStatuses_Status",
                table: "ActivityComments");

            migrationBuilder.DropTable(
                name: "ActivityCommentStatuses");

            migrationBuilder.DropTable(
                name: "ActivityStatuses");

            migrationBuilder.DropIndex(
                name: "IX_ActivityComments_Status",
                table: "ActivityComments");

            migrationBuilder.DropIndex(
                name: "IX_Activities_Status",
                table: "Activities");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ActivityCommentStatuses",
                columns: table => new
                {
                    Id = table.Column<byte>(type: "tinyint", nullable: false),
                    Name = table.Column<string>(type: "VARCHAR(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityCommentStatuses", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ActivityStatuses",
                columns: table => new
                {
                    Id = table.Column<byte>(type: "tinyint", nullable: false),
                    Name = table.Column<string>(type: "VARCHAR(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityStatuses", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ActivityComments_Status",
                table: "ActivityComments",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_Status",
                table: "Activities",
                column: "Status");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_ActivityStatuses_Status",
                table: "Activities",
                column: "Status",
                principalTable: "ActivityStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityComments_ActivityCommentStatuses_Status",
                table: "ActivityComments",
                column: "Status",
                principalTable: "ActivityCommentStatuses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
