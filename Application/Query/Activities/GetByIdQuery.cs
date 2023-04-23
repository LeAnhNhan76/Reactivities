using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Query.Activities
{
    public class GetByIdActivityQueryRequest : IRequest<GetActivityByIdQueryResponse>
    {
        public Guid Id { get; set; }
    }

    public class GetActivityByIdQueryResponse: Activity
    {
        public string HostName { get; set; }
    }

    public class GetByIdActivityQueryHandler : IRequestHandler<GetByIdActivityQueryRequest, GetActivityByIdQueryResponse>
    {
        private readonly ApplicationDbContext _context;

        public GetByIdActivityQueryHandler(ApplicationDbContext context)
        {
            this._context = context;
        }

        public async Task<GetActivityByIdQueryResponse> Handle(GetByIdActivityQueryRequest request, CancellationToken cancellationToken)
        {
            var response = await _context.Activities
                .Where(x => x.Id == request.Id)
                .Join(_context.AppUsers
                , a => a.HostId
                , au => au.Id
                , (a, au) => new GetActivityByIdQueryResponse {
                    Id = a.Id,
                    Title = a.Title,
                    Description = a.Description,
                    Category = a.Category,
                    Date = a.Date,
                    City = a.City,
                    Venue = a.Venue,
                    Status = a.Status,
                    HostId = a.HostId,
                    HostName = au.DisplayName
                })
                .FirstOrDefaultAsync();

            return response;
        }
    }
}