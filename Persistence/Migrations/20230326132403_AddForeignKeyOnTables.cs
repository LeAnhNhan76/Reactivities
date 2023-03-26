using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AddForeignKeyOnTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Followers",
                newName: "FollowingId");

            migrationBuilder.CreateIndex(
                name: "IX_Followers_FollowerId",
                table: "Followers",
                column: "FollowerId");

            migrationBuilder.CreateIndex(
                name: "IX_Followers_FollowingId",
                table: "Followers",
                column: "FollowingId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityMembers_ActivityId",
                table: "ActivityMembers",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityMembers_MemberId",
                table: "ActivityMembers",
                column: "MemberId");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityMembers_Activities_ActivityId",
                table: "ActivityMembers",
                column: "ActivityId",
                principalTable: "Activities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityMembers_AppUser_MemberId",
                table: "ActivityMembers",
                column: "MemberId",
                principalTable: "AppUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Followers_AppUser_FollowerId",
                table: "Followers",
                column: "FollowerId",
                principalTable: "AppUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Followers_AppUser_FollowingId",
                table: "Followers",
                column: "FollowingId",
                principalTable: "AppUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityMembers_Activities_ActivityId",
                table: "ActivityMembers");

            migrationBuilder.DropForeignKey(
                name: "FK_ActivityMembers_AppUser_MemberId",
                table: "ActivityMembers");

            migrationBuilder.DropForeignKey(
                name: "FK_Followers_AppUser_FollowerId",
                table: "Followers");

            migrationBuilder.DropForeignKey(
                name: "FK_Followers_AppUser_FollowingId",
                table: "Followers");

            migrationBuilder.DropIndex(
                name: "IX_Followers_FollowerId",
                table: "Followers");

            migrationBuilder.DropIndex(
                name: "IX_Followers_FollowingId",
                table: "Followers");

            migrationBuilder.DropIndex(
                name: "IX_ActivityMembers_ActivityId",
                table: "ActivityMembers");

            migrationBuilder.DropIndex(
                name: "IX_ActivityMembers_MemberId",
                table: "ActivityMembers");

            migrationBuilder.RenameColumn(
                name: "FollowingId",
                table: "Followers",
                newName: "UserId");
        }
    }
}
