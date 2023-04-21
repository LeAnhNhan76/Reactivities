using FrameworkCore.Constants;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Query.Activities
{
    public class GetAllActivityQueryRequest : IRequest<IEnumerable<ActivityQueryResponse>> 
    {
        public string Hosting { get; set; }
    }

    public class ActivityQueryResponse
    {
        public Guid Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Category { get; set; }

        public DateTimeOffset Date { get; set; }

        public string City { get; set; }

        public string Venue { get; set; }

        public Guid? HostId { get; set; }

        public byte Status { get; set; }
        
        public string HostName { get; set; }

        public string Avatar { get; set; }
    }

    public class GetAllActivityQueryHandler : IRequestHandler<GetAllActivityQueryRequest, IEnumerable<ActivityQueryResponse>>
    {
        private readonly ApplicationDbContext _context;

        public GetAllActivityQueryHandler(ApplicationDbContext context)
        {
            this._context = context;
        }

        public async Task<IEnumerable<ActivityQueryResponse>> Handle(GetAllActivityQueryRequest request, CancellationToken cancellationToken)
        {
            var data = await _context.Activities
                .Join(_context.AppUsers
                , a => a.HostId
                , au => au.Id
                , (a , au) => new ActivityQueryResponse {
                    Id = a.Id,
                    Title = a.Title,
                    Description = a.Description,
                    Category = a.Category,
                    Date = a.Date,
                    City = a.City,
                    Venue = a.Venue,
                    HostId = a.HostId,
                    Status = a.Status,
                    HostName = au.DisplayName,
                    Avatar = au.Avatar
                })
                .OrderByDescending(x => x.Date)
                .ToListAsync(cancellationToken);

            return data;
        }
    }
}