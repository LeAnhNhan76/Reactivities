using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Domain.Entities;
using FluentValidation;
using FrameworkCore.Enums;
using FrameworkCore.Extensions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Command
{
    public class AddMemberToActivityRequest : IRequest<bool>
    {
        public Guid ActivityId { get; set; }
    }

    public class AddMemberToActivityCommandValidator : AbstractValidator<AddMemberToActivityRequest>
    {
        public AddMemberToActivityCommandValidator()
        {
            RuleFor(x => x.ActivityId).NotEmpty().NotEqual(Guid.Empty);
        }
    }

    public class AddMemberToActivityCommandHandler : IRequestHandler<AddMemberToActivityRequest, bool>
    {
        private readonly ApplicationDbContext _context;
        private Guid _currentUserId { get; set; }
        public AddMemberToActivityCommandHandler(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _currentUserId = httpContextAccessor.HttpContext.CurrentUserId();
        }
        public async Task<bool> Handle(AddMemberToActivityRequest request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FirstOrDefaultAsync(x => x.Id == request.ActivityId);

            if (activity == null)
                throw new DomainException("Activity not found");

            var validStatuses = new List<byte>() {
                (byte)ActivityStatusEnum.Active,
                (byte)ActivityStatusEnum.Pending
            };

            if (!validStatuses.Contains(activity.Status))
                throw new DomainException("Activity status is invalid");

            var isExisted = await _context.ActivityMembers.AnyAsync(x => x.ActivityId == request.ActivityId &&
                x.MemberId == _currentUserId);

            if (isExisted == true)
                throw new DomainException("This activity is joined");

            var activityMember = new ActivityMember()
            {
                Id = Guid.NewGuid(),
                ActivityId = request.ActivityId,
                MemberId = _currentUserId
            };

            await _context.ActivityMembers.AddAsync(activityMember);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}