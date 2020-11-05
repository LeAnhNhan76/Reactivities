using Domain;
using MediatR;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Query.Activities
{
    public class GetByIdActivityQueryRequest : IRequest<Activity>
    {
        public Guid Id { get; set; }
    }

    public class GetByIdActivityQueryHandler : IRequestHandler<GetByIdActivityQueryRequest, Activity>
    {
        private readonly ApplicationDbContext _context;

        public GetByIdActivityQueryHandler(ApplicationDbContext context)
        {
            this._context = context;
        }

        public async Task<Activity> Handle(GetByIdActivityQueryRequest request, CancellationToken cancellationToken)
        {
            var response = await _context.Activities.FindAsync(request.Id);

            return response;
        }
    }
}