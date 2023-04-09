using System.Collections.Generic;
using System.Linq;
using Domain.Entities;
using FrameworkCore.Enums;

namespace Persistence
{
  public class Seed
  {
      public static void SeedData(ApplicationDbContext context)
      {
       // SeedActivityStatuses(context);
        SeedActivityCommentStatuses(context);
      }

      private static void SeedActivityStatuses(ApplicationDbContext context)
      {
        if (!context.ActivityStatuses.Any())
        {
          var statuses = new List<ActivityStatus>(){
            new ActivityStatus {Name = nameof(ActivityStatusEnum.Pending)},
            new ActivityStatus {Name = nameof(ActivityStatusEnum.Active)},
            new ActivityStatus {Name = nameof(ActivityStatusEnum.Inactive)},
            new ActivityStatus {Name = nameof(ActivityStatusEnum.Draft)}
          };

          context.ActivityStatuses.AddRange(statuses);
          context.SaveChanges();
        }
      }

      private static void SeedActivityCommentStatuses(ApplicationDbContext context)
      {
        if(!context.ActivityCommentStatuses.Any())
        {
          var statuses = new List<ActivityCommentStatus>() {
            new ActivityCommentStatus {Name = nameof(ActivityCommentStatusEnum.Active)},
            new ActivityCommentStatus {Name = nameof(ActivityCommentStatusEnum.Inactive)}
          };

          context.ActivityCommentStatuses.AddRange(statuses);
          context.SaveChanges();
        }
      }
  }
}