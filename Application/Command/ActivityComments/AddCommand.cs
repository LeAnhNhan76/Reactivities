using Application.Exceptions;
using Application.Query.ActivityComments;
using Domain.Entities;
using FrameworkCore.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Command.ActivityComments
{
    public class AddCommentRequest : IRequest<CommentItemOfActivity>
    {
        public Guid ActivityId { get; set; }
        public Guid UserId { get; set; }
        public string Comment { get; set; }
    }

    public class AddCommentHandler : IRequestHandler<AddCommentRequest, CommentItemOfActivity>
    {
        private readonly ApplicationDbContext _dbContext;
        public AddCommentHandler(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<CommentItemOfActivity> Handle(AddCommentRequest request, CancellationToken cancellationToken)
        {
            try
            {
                var user = await _dbContext.AppUsers.FirstOrDefaultAsync(x => x.Id == request.UserId);
                if (user == null)
                    throw new DomainException("User not found");

                var activity = await _dbContext.Activities.FirstOrDefaultAsync(x => x.Id == request.ActivityId);
                if (activity == null)
                    throw new DomainException("Activity not found");

                var now = DateTimeOffset.Now;
                var newComment = new ActivityComment
                {
                    Id = Guid.NewGuid(),
                    ActivityId = request.ActivityId,
                    UserId = request.UserId,
                    Comment = request.Comment,
                    Status = (byte)ActivityCommentStatusEnum.Active,
                    CreatedDate = now
                };

                var addResult = await _dbContext.ActivityComments.AddAsync(newComment);
                await _dbContext.SaveChangesAsync();

                return new CommentItemOfActivity
                {
                    Id = newComment.Id,
                    ActivityId = newComment.ActivityId,
                    UserId = newComment.UserId,
                    Comment = newComment.Comment,
                    DisplayName = user.DisplayName,
                    Avatar = user.Avatar,
                    CommentedDate = now
                };
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}