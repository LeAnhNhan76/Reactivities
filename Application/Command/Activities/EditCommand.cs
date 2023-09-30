using MediatR;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Command.Activities
{
    public class EditActivityCommandRequest : IRequest<bool>
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
    }

    public class EditActivityCommandHandler : IRequestHandler<EditActivityCommandRequest, bool>
    {
        private readonly ApplicationDbContext _dbContext;

        public EditActivityCommandHandler(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public async Task<bool> Handle(EditActivityCommandRequest request, CancellationToken cancellationToken)
        {
            var activity = await _dbContext.Activities.FindAsync(request.Id);

            if (activity == null)
                throw new Exception("The item is not found!");

            activity.Title = request.Title ?? activity.Title;
            activity.Description = request.Description ?? activity.Description;
            activity.Category = request.Category ?? activity.Category;
            activity.Date = request.Date;
            activity.City = request.City ?? activity.City;
            activity.Venue = request.Venue ?? activity.Venue;

            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}