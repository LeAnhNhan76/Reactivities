using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class RenameAppUsersTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityComments_AppUser_UserId",
                table: "ActivityComments");

            migrationBuilder.DropForeignKey(
                name: "FK_ActivityMembers_AppUser_MemberId",
                table: "ActivityMembers");

            migrationBuilder.DropForeignKey(
                name: "FK_Followers_AppUser_FollowerId",
                table: "Followers");

            migrationBuilder.DropForeignKey(
                name: "FK_Followers_AppUser_FollowingId",
                table: "Followers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppUser",
                table: "AppUser");

            migrationBuilder.RenameTable(
                name: "AppUser",
                newName: "AppUsers");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppUsers",
                table: "AppUsers",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityComments_AppUsers_UserId",
                table: "ActivityComments",
                column: "UserId",
                principalTable: "AppUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityMembers_AppUsers_MemberId",
                table: "ActivityMembers",
                column: "MemberId",
                principalTable: "AppUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Followers_AppUsers_FollowerId",
                table: "Followers",
                column: "FollowerId",
                principalTable: "AppUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Followers_AppUsers_FollowingId",
                table: "Followers",
                column: "FollowingId",
                principalTable: "AppUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityComments_AppUsers_UserId",
                table: "ActivityComments");

            migrationBuilder.DropForeignKey(
                name: "FK_ActivityMembers_AppUsers_MemberId",
                table: "ActivityMembers");

            migrationBuilder.DropForeignKey(
                name: "FK_Followers_AppUsers_FollowerId",
                table: "Followers");

            migrationBuilder.DropForeignKey(
                name: "FK_Followers_AppUsers_FollowingId",
                table: "Followers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_AppUsers",
                table: "AppUsers");

            migrationBuilder.RenameTable(
                name: "AppUsers",
                newName: "AppUser");

            migrationBuilder.AddPrimaryKey(
                name: "PK_AppUser",
                table: "AppUser",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityComments_AppUser_UserId",
                table: "ActivityComments",
                column: "UserId",
                principalTable: "AppUser",
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
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Followers_AppUser_FollowingId",
                table: "Followers",
                column: "FollowingId",
                principalTable: "AppUser",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
