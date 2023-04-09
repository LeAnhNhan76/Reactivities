using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class TestReSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DBCC CHECKIDENT ('ActivityStatuses', RESEED, 0)");
            migrationBuilder.Sql("DBCC CHECKIDENT ('ActivityCommentStatuses', RESEED, 0)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DBCC CHECKIDENT ('ActivityStatuses', RESEED, 1)");
            migrationBuilder.Sql("DBCC CHECKIDENT ('ActivityCommentStatuses', RESEED, 1)");
        }
    }
}
