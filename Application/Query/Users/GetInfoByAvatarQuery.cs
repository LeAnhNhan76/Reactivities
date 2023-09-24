using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Query.Users
{
    public class GetInfoByAvatarRequest : IRequest<UserInfoByAvatar>
    {
        public Guid Id { get; set; }
    }

    public class UserInfoByAvatar
    {
        public Guid Id { get; set; }
        public string DisplayName { get; set; }
        public string Avatar { get; set; }
        public DateTimeOffset JoinedDate { get; set; }
        public List<Guid> Followers { get; set; }
    }

    public class GetInfoByAvatarRequestHanlder : IRequestHandler<GetInfoByAvatarRequest, UserInfoByAvatar>
    {
        private readonly ApplicationDbContext _dbContext;
        public GetInfoByAvatarRequestHanlder(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<UserInfoByAvatar> Handle(GetInfoByAvatarRequest request, CancellationToken cancellationToken)
        {
            if (request == null) return new UserInfoByAvatar();

            var user = await _dbContext.AppUsers.FirstOrDefaultAsync(x => x.Id == request.Id);
            var followers = await _dbContext.Followers
                .Where(x => x.FollowingId == request.Id)
                .Select(x => x.FollowerId)
                .ToListAsync();

            return new UserInfoByAvatar
            {
                Id = user.Id,
                DisplayName = user.DisplayName,
                Avatar = user.Avatar,
                JoinedDate = user.CreatedDate,
                Followers = followers
            };
        }
    }
}