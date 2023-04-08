using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain.Abstracts;
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

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            var currentDateTimeOffset = DateTimeOffset.UtcNow;

            var addedEntities = ChangeTracker.Entries<AuditEntity>()
                .Where(x => x.State == EntityState.Added)
                .ToList();
            
            var modifiedEntities = ChangeTracker.Entries<AuditEntity>()
                .Where(x => x.State == EntityState.Modified)
                .ToList();

            foreach(var entity in addedEntities) 
            {
                if(entity.Entity != null) 
                {
                    entity.Entity.CreatedDate = currentDateTimeOffset;
                }
            }

            foreach(var entity in modifiedEntities)
            {
                if(entity.Entity != null)
                {
                    entity.Entity.ModifiedDate = currentDateTimeOffset;
                }
            }

            return await base.SaveChangesAsync(cancellationToken);
        }

        public async Task SaveChangesAsync()
        {
            await SaveChangesAsync(default(CancellationToken));
        }
    }
}
