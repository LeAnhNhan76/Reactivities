using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Command
{
    public class UnFollowUserCommandRequest: IRequest<bool>
    {
        public Guid UserId { get; set; }
        public Guid FollowerId { get; set; }
    }

    public class UnFollowUserCommandHandler : IRequestHandler<UnFollowUserCommandRequest, bool>
    {
        private readonly ApplicationDbContext _context;
        public UnFollowUserCommandHandler(ApplicationDbContext context) 
        {
            _context = context;
        }

        public async Task<bool> Handle(UnFollowUserCommandRequest request, CancellationToken cancellationToken)
        {
            var isExistedUsers = await _context.AppUsers.AnyAsync(x => x.Id == request.UserId)
                && await _context.AppUsers.AnyAsync(x => x.Id == request.FollowerId);

            if (isExistedUsers == false)
                throw new DomainException("One or two users is not existed");

            var follower = await _context.Followers.FirstOrDefaultAsync(x => 
                x.FollowerId == request.FollowerId && x.FollowingId == request.UserId);

            if (follower == null)
                throw new DomainException("This user is not followed");

            _context.Followers.Remove(follower);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}