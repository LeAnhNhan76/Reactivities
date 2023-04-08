using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain.Abstracts;
using Domain.Entities;
using FrameworkCore.Constants;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class ApplicationDbContext: DbContext
    {
        private readonly Guid _currentUserId;
        public ApplicationDbContext(DbContextOptions options
            , IHttpContextAccessor httpContextAccessor):base(options)
        {
            if (httpContextAccessor != null)
            {
                var userId = httpContextAccessor?.HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == ReactivitiesClaimTypes.CurrentUserId);

                if(userId != null)
                {
                    _currentUserId = new Guid(userId.Value);
                }
            }
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

        private bool IsCurrentUserIdNotEmpty () => _currentUserId != null && _currentUserId != Guid.Empty;

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            var currentDateTimeOffset = DateTimeOffset.UtcNow;

            var addedEntities = ChangeTracker.Entries<AuditEntity>()
                .Where(x => x.State == EntityState.Added)
                .Select(x => x.Entity)
                .ToList();
            
            var modifiedEntities = ChangeTracker.Entries<AuditEntity>()
                .Where(x => x.State == EntityState.Modified)
                .Select(x => x.Entity)
                .ToList();

            addedEntities.ForEach(x => {
                x.CreatedDate = currentDateTimeOffset;
                x.CreatedBy = IsCurrentUserIdNotEmpty() ? _currentUserId : new Guid(Constant.SYSTEM_USER_ID);
            });

            modifiedEntities.ForEach(x => {
                x.ModifiedDate = currentDateTimeOffset;
                x.ModifiedBy = IsCurrentUserIdNotEmpty() ?  _currentUserId : new Guid(Constant.SYSTEM_USER_ID);
            });

            
            return await base.SaveChangesAsync(cancellationToken);
        }

        public async Task SaveChangesAsync()
        {
            await SaveChangesAsync(default(CancellationToken));
        }
    }
}
