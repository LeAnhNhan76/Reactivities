using Domain.Entities;
using FrameworkCore.Enums;
using FrameworkCore.Extensions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Command.ActivityComments
{
    public class AddCommentRequest : IRequest<bool>
    {
        public Guid ActivityId { get; set; }
        public string Comment { get; set; }
    }

    public class AddCommentHandler : IRequestHandler<AddCommentRequest, bool>
    {
        private readonly ApplicationDbContext _dbContext;
        private Guid _currentUserId { get; set; }
        public AddCommentHandler(ApplicationDbContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _currentUserId = httpContextAccessor.HttpContext.CurrentUserId();
        }
        public async Task<bool> Handle(AddCommentRequest request, CancellationToken cancellationToken)
        {
            try
            {
                var newComment = new ActivityComment
                {
                    Id = Guid.NewGuid(),
                    ActivityId = request.ActivityId,
                    UserId = _currentUserId,
                    Comment = request.Comment,
                    Status = (byte)ActivityCommentStatusEnum.Active
                };

                await _dbContext.ActivityComments.AddAsync(newComment);
                await _dbContext.SaveChangesAsync();

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}