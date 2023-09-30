using FrameworkCore.Enums;
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
    public class GetAllActivityQueryRequest : IRequest<IEnumerable<ActivityQueryResponse>>
    {
        public string Hosting { get; set; }
    }

    public class ActivityQueryResponse
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public DateTimeOffset Date { get; set; }

        public string City { get; set; }

        public string Venue { get; set; }

        public Guid? HostId { get; set; }

        public byte Status { get; set; }

        public string HostName { get; set; }

        public string Avatar { get; set; }
        public List<MemberJoinInfo> Members { get; set; }
    }

    public class MemberJoinInfo
    {
        public Guid UserId { get; set; }
        public string DisplayName { get; set; }
        public string Avatar { get; set; }
        public List<Guid> Followers { get; set; }
    }

    public class GetAllActivityQueryHandler : IRequestHandler<GetAllActivityQueryRequest, IEnumerable<ActivityQueryResponse>>
    {
        private readonly ApplicationDbContext _dbContext;

        public GetAllActivityQueryHandler(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public async Task<IEnumerable<ActivityQueryResponse>> Handle(GetAllActivityQueryRequest request, CancellationToken cancellationToken)
        {
            var data = await _dbContext.Activities
                .Where(x => x.Status != (byte)ActivityStatusEnum.Draft)
                .Join(_dbContext.AppUsers
                , a => a.HostId
                , au => au.Id
                , (a, au) => new ActivityQueryResponse
                {
                    Id = a.Id,
                    Title = a.Title,
                    Description = a.Description,
                    Category = a.Category,
                    Date = a.Date,
                    City = a.City,
                    Venue = a.Venue,
                    HostId = a.HostId,
                    Status = a.Status,
                    HostName = au.DisplayName,
                    Avatar = au.Avatar,
                    Members = _dbContext.ActivityMembers
                        .Where(am => am.ActivityId == a.Id)
                        .Join(_dbContext.AppUsers
                        , am => am.MemberId
                        , au2 => au2.Id
                        , (am, au2) => new MemberJoinInfo
                        {
                            UserId = am.MemberId,
                            DisplayName = au2.DisplayName,
                            Avatar = au2.Avatar,
                            Followers = _dbContext.Followers
                                .Where(fw => fw.FollowingId == am.MemberId)
                                .Select(fw => fw.FollowerId)
                                .ToList()
                        }).ToList()
                })
                .OrderByDescending(x => x.Date)
                .ToListAsync(cancellationToken);

            return data;
        }
    }
}