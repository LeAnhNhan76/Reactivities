using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using FrameworkCore.Enums;
using FrameworkCore.Extensions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Command
{
    public class RemoveMemberOutOfActivityRequest : IRequest<bool>
    {
        public Guid ActivityId { get; set; }
    }

    public class RemoveMemberOutOfActivityHandler : IRequestHandler<RemoveMemberOutOfActivityRequest, bool>
    {
        private readonly ApplicationDbContext _dbContext;
        private Guid _currentUserId { get; set; }

        public RemoveMemberOutOfActivityHandler(ApplicationDbContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _currentUserId = httpContextAccessor.HttpContext.CurrentUserId();
        }

        public async Task<bool> Handle(RemoveMemberOutOfActivityRequest request, CancellationToken cancellationToken)
        {
            var activity = await _dbContext.Activities.FirstOrDefaultAsync(x => x.Id == request.ActivityId);

            if (activity == null || activity?.Status == (byte)ActivityStatusEnum.Inactive ||
             activity?.Status == (byte)ActivityStatusEnum.Draft)
                throw new DomainException("Activity is invalid");

            if (activity.HostId == _currentUserId)
                throw new DomainException("You are hosting, so you cannot perform action");

            var activityMember = await _dbContext.ActivityMembers.FirstOrDefaultAsync(x =>
                 x.ActivityId == request.ActivityId && x.MemberId == _currentUserId);

            if (activityMember == null)
                throw new DomainException("You've not joined activity yet");

            _dbContext.Remove(activityMember);

            await _dbContext.SaveChangesAsync();

            return true;
        }
    }
}