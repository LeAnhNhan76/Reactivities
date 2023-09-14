using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
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
        public List<MemberJoinInfo> Members { get; set; }
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

            if (response != null) {
                var memberIds = _context.ActivityMembers
                    .Where(am => am.ActivityId == response.Id)
                    .Select(am => am.MemberId)
                    .ToList();
                if (response.HostId != null) {
                    memberIds.Insert(0, response.HostId??Guid.Empty);
                }

                var members = memberIds
                    .Join(_context.AppUsers
                    , am => am
                    , au2 => au2.Id
                    , (am, au2) => new MemberJoinInfo{
                        UserId = am,
                        DisplayName = au2.DisplayName,
                        Avatar = au2.Avatar,
                        Followers = _context.Followers
                            .Where(fw => fw.FollowingId == am)
                            .Select(fw => fw.FollowerId)
                            .ToList()
                    }).ToList();
                
                response.Members = members;
            }

            return response;
        }
    }
}