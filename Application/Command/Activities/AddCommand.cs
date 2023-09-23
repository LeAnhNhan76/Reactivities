using Domain.Entities;
using FluentValidation;
using FrameworkCore.Enums;
using FrameworkCore.Extensions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Command.Activities
{
    public class AddToActivityCommandRequest : IRequest<bool>
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTimeOffset Date { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
    }

    public class AddToActivityCommandValidator : AbstractValidator<AddToActivityCommandRequest>
    {
        public AddToActivityCommandValidator()
        {
            RuleFor(x => x.Title).NotNull().NotEmpty();
            RuleFor(x => x.Date).GreaterThanOrEqualTo(DateTimeOffset.Now);
        }
    }

    public class AddToActivityCommandHandler : IRequestHandler<AddToActivityCommandRequest, bool>
    {
        private readonly ApplicationDbContext _dbContext;
        private Guid _currentUserId { get; set; }
        public AddToActivityCommandHandler(ApplicationDbContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            this._dbContext = dbContext;
            this._currentUserId = httpContextAccessor.HttpContext.CurrentUserId();
        }

        public async Task<bool> Handle(AddToActivityCommandRequest request, CancellationToken cancellationToken)
        {
            var currentDateTimeOffset = DateTimeOffset.UtcNow;

            var newActivityId = Guid.NewGuid();

            var activity = new Activity
            {
                Id = newActivityId,
                Title = request.Title,
                Description = request.Description,
                Category = request.Category,
                Date = request.Date,
                City = request.City,
                Venue = request.Venue,
                HostId = _currentUserId,
                Status = request.Date > currentDateTimeOffset
                    ? (byte)ActivityStatusEnum.Pending
                    : (byte)ActivityStatusEnum.Active
            };
            await _dbContext.Activities.AddAsync(activity);

            var activityMember = new ActivityMember()
            {
                Id = Guid.NewGuid(),
                ActivityId = newActivityId,
                MemberId = _currentUserId,
            };
            await _dbContext.ActivityMembers.AddAsync(activityMember);

            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}