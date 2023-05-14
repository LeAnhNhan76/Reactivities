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

    public class FollowUserCommandRequest: IRequest<bool>
    {
        public Guid UserId { get; set; }
        public Guid FollowerId { get; set; }
    }

    public class FollowUserCommandHandler : IRequestHandler<FollowUserCommandRequest, bool>
    {
        private readonly ApplicationDbContext _context;
        public FollowUserCommandHandler(ApplicationDbContext context) 
        {
            _context = context;
        }

        public async Task<bool> Handle(FollowUserCommandRequest request, CancellationToken cancellationToken)
        {
            var isExistedUsers = await _context.AppUsers.AnyAsync(x => x.Id == request.UserId)
                && await _context.AppUsers.AnyAsync(x => x.Id == request.FollowerId);

            if (isExistedUsers == false)
                throw new DomainException("One or two users is not existed");

            var isFollowed = await _context.Followers.AnyAsync(x => x.FollowerId == request.FollowerId && x.FollowingId == request.UserId);

            if (isFollowed)
                throw new DomainException("This user is followed");

            var newFollwer = new Follower{
              Id = Guid.NewGuid(),
              FollowerId = request.FollowerId,
              FollowingId = request.UserId,
            };

            await _context.Followers.AddAsync(newFollwer);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}