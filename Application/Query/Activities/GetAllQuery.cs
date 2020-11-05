using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Query.Activities
{
    public class GetAllActivityQueryRequest : IRequest<IReadOnlyCollection<Activity>> { }

    public class GetAllActivityQueryHandler : IRequestHandler<GetAllActivityQueryRequest, IReadOnlyCollection<Activity>>
    {
        private readonly ApplicationDbContext _context;

        public GetAllActivityQueryHandler(ApplicationDbContext context)
        {
            this._context = context;
        }

        public async Task<IReadOnlyCollection<Activity>> Handle(GetAllActivityQueryRequest request, CancellationToken cancellationToken)
        {
            var response = await _context.Activities.ToListAsync(cancellationToken);

            return response;
        }
    }
}