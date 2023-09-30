using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Query.Activities
{
    public class GetByIdActivityQueryRequest : IRequest<ActivityDetail>
    {
        public Guid Id { get; set; }
    }

    public class ActivityDetail : ActivityPagingItem
    {
        public string Description { get; set; }
    }

    public class GetByIdActivityQueryHandler : IRequestHandler<GetByIdActivityQueryRequest, ActivityDetail>
    {
        private readonly ApplicationDbContext _dbContext;

        public GetByIdActivityQueryHandler(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public async Task<ActivityDetail> Handle(GetByIdActivityQueryRequest request, CancellationToken cancellationToken)
        {
            var details = await _dbContext.Activities
                .Where(x => x.Id == request.Id)
                .Join(_dbContext.AppUsers
                , a => a.HostId
                , au => au.Id
                , (a, au) => new ActivityDetail
                {
                    Id = a.Id,
                    Title = a.Title,
                    Description = a.Description,
                    Category = a.Category,
                    Date = a.Date,
                    City = a.City,
                    Venue = a.Venue,
                    Status = a.Status,
                    HostId = a.HostId,
                    HostName = au.DisplayName
                })
                .FirstOrDefaultAsync();

            if (details != null)
            {
                var joiners = await _dbContext.ActivityMembers.Where(x => x.ActivityId == details.Id)
                .Select(x => new ActivityJoinerItem
                {
                    Id = x.Id,
                    ActivityId = x.ActivityId,
                    JoinerId = x.MemberId,
                    JoinerAvatar = x.User.Avatar,
                    JoinerDisplayName = x.User.DisplayName,
                    JoinerRegisterDate = x.User.CreatedDate,
                    JoinerFollowers = _dbContext.Followers
                        .Where(f => f.FollowingId == x.MemberId)
                        .Select(f => f.FollowerId)
                        .ToList()
                }).ToListAsync();

                details.Joiners = joiners;
            }

            return details;
        }
    }
}