using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Domain.Entities;
using FluentValidation;
using FrameworkCore.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Command
{
    public class AddMemberToActivityCommandRequest: IRequest<bool>
    {
        public Guid ActivityId { get; set; }
        public Guid UserId { get; set; }
    }

    public class AddMemberToActivityCommandValidator: AbstractValidator<AddMemberToActivityCommandRequest>
    {
        public AddMemberToActivityCommandValidator()
        {
            RuleFor(x => x.ActivityId).NotEmpty().NotEqual(Guid.Empty);
            RuleFor(x => x.UserId).NotEmpty().NotEqual(Guid.Empty);
        }
    }

    public class AddMemberToActivityCommandHandler : IRequestHandler<AddMemberToActivityCommandRequest, bool>
    {
        private readonly ApplicationDbContext _context;
        public AddMemberToActivityCommandHandler(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<bool> Handle(AddMemberToActivityCommandRequest request, CancellationToken cancellationToken)
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

            var activityMember = new ActivityMember() {
                ActivityId = request.ActivityId,
                MemberId = request.UserId
            };

            await _context.ActivityMembers.AddAsync(activityMember);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}