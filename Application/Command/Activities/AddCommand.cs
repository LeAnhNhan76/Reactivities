using Domain;
using MediatR;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Command.Activities
{
    public class AddToActivityCommandRequest : IRequest
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
    }

    public class AddToActivityCommandHandler : IRequestHandler<AddToActivityCommandRequest>
    {
        private readonly ApplicationDbContext _context;
        public AddToActivityCommandHandler(ApplicationDbContext context)
        {
            this._context = context;
        }

        public async Task<Unit> Handle(AddToActivityCommandRequest request, CancellationToken cancellationToken)
        {
            var activity = new Activity
            {
                Title = request.Title,
                Description = request.Description,
                Category = request.Category,
                Date = request.Date,
                City = request.City,
                Venue = request.Venue
            };

            await _context.Activities.AddAsync(activity);
            var success = await _context.SaveChangesAsync() >  0;

            if (success) return Unit.Value;
            throw new Exception("Problem saving changes");
        }
    }
}