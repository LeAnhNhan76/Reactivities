using Domain;
using MediatR;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class ActivityGetByIdQueryRequest : IRequest<Activity>
    {
        public Guid Id { get; set; }
    }

    public class ActivityGetByIdQueryHandler : IRequestHandler<ActivityGetByIdQueryRequest, Activity>
    {
        private readonly ApplicationDbContext _context;

        public ActivityGetByIdQueryHandler(ApplicationDbContext context)
        {
            this._context = context;
        }

        public async Task<Activity> Handle(ActivityGetByIdQueryRequest request, CancellationToken cancellationToken)
        {
            var response = await _context.Activities.FindAsync(request.Id);

            return response;
        }
    }
}