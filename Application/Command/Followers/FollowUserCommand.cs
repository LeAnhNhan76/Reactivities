using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Command
{
    public class FollowUserRequest
    {
        public Guid UserId { get; set; }
    }

    public class FollowUserCommandRequest : IRequest<bool>
    {
        public Guid UserId { get; set; }
        public Guid FollowerId { get; set; }
    }

    public class FollowUserCommandHandler : IRequestHandler<FollowUserCommandRequest, bool>
    {
        private readonly ApplicationDbContext _dbContext;
        public FollowUserCommandHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> Handle(FollowUserCommandRequest request, CancellationToken cancellationToken)
        {
            var isExistedUsers = await _dbContext.AppUsers.AnyAsync(x => x.Id == request.UserId)
                && await _dbContext.AppUsers.AnyAsync(x => x.Id == request.FollowerId);

            if (isExistedUsers == false)
                throw new DomainException("One or two users is not existed");

            var isFollowed = await _dbContext.Followers.AnyAsync(x => x.FollowerId == request.FollowerId && x.FollowingId == request.UserId);

            if (isFollowed)
                throw new DomainException("This user is followed");

            var newFollwer = new Follower
            {
                Id = Guid.NewGuid(),
                FollowerId = request.FollowerId,
                FollowingId = request.UserId,
            };

            await _dbContext.Followers.AddAsync(newFollwer);
            await _dbContext.SaveChangesAsync();

            return true;
        }
    }
}