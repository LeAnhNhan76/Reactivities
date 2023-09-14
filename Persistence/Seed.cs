using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using FrameworkCore.Enums;

namespace Persistence
{
  public class Seed
  {
      public static async Task SeedData(ApplicationDbContext context)
      {
        await SeedActivityStatuses(context);
        await SeedActivityCommentStatuses(context);
        await context.SaveChangesAsync();
      }

      private static async Task SeedActivityStatuses(ApplicationDbContext context)
      {
        if (!context.ActivityStatuses.Any())
        {
          var statuses = new List<ActivityStatus>(){
            new ActivityStatus {Name = nameof(ActivityStatusEnum.Pending)},
            new ActivityStatus {Name = nameof(ActivityStatusEnum.Active)},
            new ActivityStatus {Name = nameof(ActivityStatusEnum.Inactive)},
            new ActivityStatus {Name = nameof(ActivityStatusEnum.Draft)}
          };

          await context.ActivityStatuses.AddRangeAsync(statuses);
        }
      }

      private static async Task SeedActivityCommentStatuses(ApplicationDbContext context)
      {
        if(!context.ActivityCommentStatuses.Any())
        {
          var commentStatuses = new List<ActivityCommentStatus>() {
            new ActivityCommentStatus {Name = nameof(ActivityCommentStatusEnum.Active)},
            new ActivityCommentStatus {Name = nameof(ActivityCommentStatusEnum.Inactive)}
          };

          await context.ActivityCommentStatuses.AddRangeAsync(commentStatuses);
        }
      }
  }
}