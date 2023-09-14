using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class ReSeedIdentityStatusTbls : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                DBCC CHECKIDENT ('ActivityStatuses', RESEED, 0);
            ");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                DBCC CHECKIDENT ('ActivityStatuses', RESEED, 1);
            ");
        }
    }
}
