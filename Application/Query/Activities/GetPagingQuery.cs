using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FrameworkCore.CustomModels;
using FrameworkCore.Extensions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;
using Persistence;

namespace Application.Query
{
    public class GetPagingActivitiesRequest : PagingParams, IRequest<PagedList<ActivityPagingItem>>
    {
        public string SearchText { get; set; }
        public string Category { get; set; }
        public bool IsHosting { get; set; }
        public bool IsGoing { get; set; }
        public DateTimeOffset? Date { get; set; }
    }

    public class ActivityPagingItem
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public DateTimeOffset Date { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
        public Guid? HostId { get; set; }
        public string HostName { get; set; }
        public byte Status { get; set; }
        public string StatusName { get; set; }
        public List<ActivityJoinerItem> Joiners { get; set; }
    }

    public class ActivityJoinerItem
    {
        public Guid Id { get; set; }
        public Guid ActivityId { get; set; }
        public Guid JoinerId { get; set; }
        public string JoinerAvatar { get; set; }
        public string JoinerDisplayName { get; set; }
        public DateTimeOffset JoinerRegisterDate { get; set; }
        public List<Guid> JoinerFollowers { get; set; }
    }

    public class GetPagingActivitiesHandler : IRequestHandler<GetPagingActivitiesRequest, PagedList<ActivityPagingItem>>
    {
        private readonly ApplicationDbContext _context;
        private Guid _currentUserId { get; set; }

        public GetPagingActivitiesHandler(ApplicationDbContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _currentUserId = httpContextAccessor.HttpContext.CurrentUserId();
        }

        public async Task<PagedList<ActivityPagingItem>> Handle(GetPagingActivitiesRequest request, CancellationToken cancellationToken)
        {
            var query = _context.Activities.AsQueryable();

            if (!string.IsNullOrEmpty(request.SearchText))
            {
                query = query.Where(x => x.Title.Contains(request.SearchText) ||
                     x.Description.Contains(request.SearchText) ||
                     x.Category.Contains(request.SearchText)).AsQueryable();
            }

            if (!string.IsNullOrEmpty(request.Category))
            {
                query = query.Where(x => x.Category == request.Category);
            }

            if (request.IsHosting)
            {
                query = query.Where(x => x.HostId == _currentUserId);
            }

            if (request.IsGoing)
            {
                query = query.Where(x => x.Members.Select(x => x.MemberId).Contains(_currentUserId));
            }

            if (request.Date != null)
            {
                query = query.Where(x => x.Date == request.Date);
            }

            var totalItems = await query.CountAsync();
            var items = await query.Paging(request.PageIndex, request.ItemsPerPage)
                .Join(_context.AppUsers
                , a => a.HostId
                , u => u.Id
                , (a, u) => new ActivityPagingItem
                {
                    Id = a.Id,
                    Title = a.Title,
                    Category = a.Category,
                    Date = a.Date,
                    City = a.City,
                    Venue = a.Venue,
                    HostId = a.HostId,
                    HostName = u.DisplayName,
                    Status = a.Status,
                    StatusName = a.ActivityStatus.Name
                }).ToListAsync();

            var itemsId = items.Select(x => x.Id);

            var joiners = await _context.ActivityMembers.Where(x => itemsId.Contains(x.ActivityId))
                .Select(x => new ActivityJoinerItem
                {
                    Id = x.Id,
                    ActivityId = x.ActivityId,
                    JoinerId = x.MemberId,
                    JoinerAvatar = x.User.Avatar,
                    JoinerDisplayName = x.User.DisplayName,
                    JoinerRegisterDate = x.User.CreatedDate,
                    JoinerFollowers = _context.Followers
                        .Where(f => f.FollowingId == x.MemberId)
                        .Select(f => f.FollowerId)
                        .ToList()
                }).ToListAsync();

            foreach (var item in items)
            {
                item.Joiners = joiners.Where(x => x.ActivityId == item.Id).ToList();
            }

            return new PagedList<ActivityPagingItem>(items, request.PageIndex, request.ItemsPerPage, totalItems);
        }
    }
}