using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class ActivityGetAllQueryRequest : IRequest<IReadOnlyCollection<Activity>> { }
    public class ActivityGetAllQueryHandler : IRequestHandler<ActivityGetAllQueryRequest, IReadOnlyCollection<Activity>>
    {
        private readonly ApplicationDbContext _context;

        public ActivityGetAllQueryHandler(ApplicationDbContext context)
        {
            this._context = context;
        }

        public async Task<IReadOnlyCollection<Activity>> Handle(ActivityGetAllQueryRequest request, CancellationToken cancellationToken)
        {
            var response = await _context.Activities.ToListAsync();

            return response;
        }
    }
}