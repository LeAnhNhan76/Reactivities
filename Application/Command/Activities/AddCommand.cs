using Domain;
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
        private readonly ApplicationDbContext _context;
        public AddToActivityCommandHandler(ApplicationDbContext context)
        {
            this._context = context;
        }

        public async Task<bool> Handle(AddToActivityCommandRequest request, CancellationToken cancellationToken)
        {
            if (request == null)
                return false;
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
            await _context.SaveChangesAsync();

            return true;
        }
    }
}