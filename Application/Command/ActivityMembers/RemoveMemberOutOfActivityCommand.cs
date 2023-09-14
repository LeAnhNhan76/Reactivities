using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using FrameworkCore.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Command
{
    public class RemoveMemberOutOfActivityRequest: IRequest<bool>
    {
        public Guid ActivityId { get; set; }
        public Guid UserId { get; set; }
    }

    public class RemoveMemberOutOfActivityHandler : IRequestHandler<RemoveMemberOutOfActivityRequest, bool>
    {
        private readonly ApplicationDbContext _context;

        public RemoveMemberOutOfActivityHandler(ApplicationDbContext context) 
        {
            _context = context;
        }

        public async Task<bool> Handle(RemoveMemberOutOfActivityRequest request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FirstOrDefaultAsync(x => x.Id == request.ActivityId);

            if (activity == null || activity?.Status == (byte)ActivityStatusEnum.Inactive ||
             activity?.Status == (byte)ActivityStatusEnum.Draft)
                throw new DomainException("Activity is invalid");

            if (activity.HostId == request.UserId) 
                throw new DomainException("You are hosting, so you cannot perform action");

            var activityMember = await _context.ActivityMembers.FirstOrDefaultAsync(x =>
                 x.ActivityId == request.ActivityId && x.MemberId == request.UserId);
        
            if (activityMember == null)
                throw new DomainException("You've not joined activity yet");

            _context.Remove(activityMember);

            await _context.SaveChangesAsync();

            return true;
        }
    }
}