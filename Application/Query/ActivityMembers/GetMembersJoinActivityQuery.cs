using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Query
{
    public class GetMembersJoinActivityRequest : IRequest<List<MemberJoinActivityInfo>>
    {
        public Guid ActivityId { get; set; }
    }

    public class MemberJoinActivityInfo
    {
        public Guid UserId { get; set; }
        public string DisplayName { get; set; }
        public string Avatar { get; set; }
        public List<Guid> Followers { get; set; }
    }

    public class GetMembersJoinActivityQueryHandler : IRequestHandler<GetMembersJoinActivityRequest, List<MemberJoinActivityInfo>>
    {
        private readonly ApplicationDbContext _dbContext;
        public GetMembersJoinActivityQueryHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<List<MemberJoinActivityInfo>> Handle(GetMembersJoinActivityRequest request, CancellationToken cancellationToken)
        {
            var members = await _dbContext.ActivityMembers
                .Where(x => x.ActivityId == request.ActivityId)
                .Join(_dbContext.AppUsers
                , x => x.MemberId
                , y => y.Id
                , (x, y) => new MemberJoinActivityInfo
                {
                    UserId = x.MemberId,
                    DisplayName = y.DisplayName,
                    Avatar = y.Avatar,
                    Followers = _dbContext.Followers.Where(fw => fw.FollowingId == x.MemberId)
                        .Select(fw => fw.FollowerId).ToList()
                }).ToListAsync();

            return members;
        }
    }
}