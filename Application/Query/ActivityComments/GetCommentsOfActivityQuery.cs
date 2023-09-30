using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using Persistence.Migrations;

namespace Application.Query.ActivityComments
{
    public class GetCommentsOfActivityRequest : IRequest<List<CommentItemOfActivity>>
    {
        public Guid ActivityId { get; set; }
    }

    public class CommentItemOfActivity
    {
        public Guid ActivityId { get; set; }
        public Guid UserId { get; set; }
        public string DisplayName { get; set; }
        public string Avatar { get; set; }
        public string Comment { get; set; }
        public DateTimeOffset CommentedDate { get; set; }
    }

    public class GetCommentsOfActivityHandler : IRequestHandler<GetCommentsOfActivityRequest, List<CommentItemOfActivity>>
    {
        private readonly ApplicationDbContext _dbContext;
        public GetCommentsOfActivityHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<List<CommentItemOfActivity>> Handle(GetCommentsOfActivityRequest request, CancellationToken cancellationToken)
        {
            var comments = await _dbContext.ActivityComments
                .Where(x => x.ActivityId == request.ActivityId)
                .Select(x => new CommentItemOfActivity
                {
                    ActivityId = x.ActivityId,
                    UserId = x.UserId,
                    DisplayName = x.User.DisplayName,
                    Avatar = x.User.Avatar,
                    Comment = x.Comment,
                    CommentedDate = x.CreatedDate
                }).ToListAsync();

            return comments;
        }
    }
}