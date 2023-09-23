using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FrameworkCore.CustomModels;
using FrameworkCore.Extensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Query
{
    public class GetPagingActivitiesRequest : PagingParams, IRequest<PagedList<ActivityPagingItem>>
    {
        public string SearchText { get; set; }
        public string Category { get; set; }
        public bool IsHosting { get; set; }
        public bool IsGoing { get; set; }
    }

    public class ActivityPagingItem
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
    }

    public class GetPagingActivitiesHandler : IRequestHandler<GetPagingActivitiesRequest, PagedList<ActivityPagingItem>>
    {
        private readonly ApplicationDbContext _context;

        public GetPagingActivitiesHandler(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<PagedList<ActivityPagingItem>> Handle(GetPagingActivitiesRequest request, CancellationToken cancellationToken)
        {
            var query = _context.Activities;

            var totalItems = await query.CountAsync();
            var items = await query.Paging(request.PageIndex, request.ItemsPerPage)
                .Select(a => new ActivityPagingItem
                {
                    Id = a.Id,
                    Title = a.Title,
                    Description = a.Description,
                    Category = a.Category
                }).ToListAsync();


            return new PagedList<ActivityPagingItem>(items, request.PageIndex, request.ItemsPerPage, totalItems);
        }
    }
}