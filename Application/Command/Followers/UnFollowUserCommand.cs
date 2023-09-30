using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Command
{
    public class UnFollowUserCommandRequest : IRequest<bool>
    {
        public Guid UserId { get; set; }
        public Guid FollowerId { get; set; }
    }

    public class UnFollowUserCommandHandler : IRequestHandler<UnFollowUserCommandRequest, bool>
    {
        private readonly ApplicationDbContext _dbContext;
        public UnFollowUserCommandHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> Handle(UnFollowUserCommandRequest request, CancellationToken cancellationToken)
        {
            var isExistedUsers = await _dbContext.AppUsers.AnyAsync(x => x.Id == request.UserId)
                && await _dbContext.AppUsers.AnyAsync(x => x.Id == request.FollowerId);

            if (isExistedUsers == false)
                throw new DomainException("One or two users is not existed");

            var follower = await _dbContext.Followers.FirstOrDefaultAsync(x =>
                x.FollowerId == request.FollowerId && x.FollowingId == request.UserId);

            if (follower == null)
                throw new DomainException("This user is not followed");

            _dbContext.Followers.Remove(follower);
            await _dbContext.SaveChangesAsync();

            return true;
        }
    }
}