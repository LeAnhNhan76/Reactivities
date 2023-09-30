using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using FluentValidation;
using FrameworkCore.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Command
{
    public class CancelActivityCommandRequest : IRequest<bool>
    {
        public Guid ActivityId { get; set; }
        public Guid UserId { get; set; }
    }

    public class CancelActivityCommandValidator : AbstractValidator<CancelActivityCommandRequest>
    {
        public CancelActivityCommandValidator()
        {
            RuleFor(x => x.ActivityId).NotEmpty().NotEqual(Guid.Empty);
            RuleFor(x => x.UserId).NotEmpty().NotEqual(Guid.Empty);
        }
    }

    public class CancelActivityCommandHandler : IRequestHandler<CancelActivityCommandRequest, bool>
    {
        private readonly ApplicationDbContext _dbContext;
        public CancelActivityCommandHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<bool> Handle(CancelActivityCommandRequest request, CancellationToken cancellationToken)
        {
            var activity = await _dbContext.Activities.FirstOrDefaultAsync(x => x.Id == request.ActivityId);

            if (activity == null)
                throw new DomainException("Activity not found");

            if (activity.HostId != request.UserId)
                throw new DomainException("Have no privilege to cancel this activity");

            activity.Status = (byte)ActivityStatusEnum.Inactive;
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}