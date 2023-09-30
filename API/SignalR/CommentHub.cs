using System;
using System.Threading.Tasks;
using Application.Command.ActivityComments;
using Application.Query.ActivityComments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class CommentHub : Hub
    {
        private readonly IMediator _mediator;
        public CommentHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendCommentAsync(AddCommentRequest request)
        {
            var newComment = await _mediator.Send(request);

            await Clients.Group(request.ActivityId.ToString()).SendAsync("ReceiveComment", newComment);
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var activityId = httpContext.Request.Query["activityId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, activityId);
            var commentsList = await _mediator.Send(new GetCommentsOfActivityRequest
            {
                ActivityId = Guid.Parse(activityId)
            });
            await Clients.Caller.SendAsync("LoadComments", commentsList);
        }
    }
}