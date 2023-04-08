using Domain.Entities;
using MediatR;
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
        public DateTime Date { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
    }

    public class AddToActivityCommandHandler : IRequestHandler<AddToActivityCommandRequest, bool>
    {
        private readonly ApplicationDbContext _dbContext;
        public AddToActivityCommandHandler(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public async Task<bool> Handle(AddToActivityCommandRequest request, CancellationToken cancellationToken)
        {
            var activity = new Activity
            {
                Id = Guid.NewGuid(),
                Title = request.Title,
                Description = request.Description,
                Category = request.Category,
                Date = request.Date,
                City = request.City,
                Venue = request.Venue
            };

            await _dbContext.Activities.AddAsync(activity);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}