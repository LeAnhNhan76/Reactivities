using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class ApplicationDbContext: DbContext
    {
        public ApplicationDbContext(DbContextOptions options):base(options)
        {
        }
        
        public DbSet<Activity> Activities { get; set; }
        public DbSet<ActivityStatus> ActivityStatuses { get; set; }
        public DbSet<ActivityComment> ActivityComments { get; set; }
        public DbSet<ActivityCommentStatus> ActivityCommentStatuses { get; set; }
        public DbSet<ActivityMember> ActivityMembers { get; set; }
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<Follower> Followers { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {}
    }
}
