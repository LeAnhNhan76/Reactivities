using System;
using System.Threading.Tasks;
using Application.Command;
using Application.Query;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class ActivityMembersController : ApiController
    {
        private readonly IMediator _mediator;
        public ActivityMembersController(IHttpContextAccessor context
          , IMediator mediator
        ) : base(context)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> GetMembersJoinActivity([FromQuery] Guid activityId)
        {
            var request = new GetMembersJoinActivityRequest()
            {
                ActivityId = activityId
            };

            var result = await _mediator.Send(request);

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> JoinActivityAsync([FromQuery] Guid activityId)
        {
            var request = new AddMemberToActivityRequest()
            {
                ActivityId = activityId
            };

            var result = await _mediator.Send(request);
            return Ok(result);
        }

        [HttpDelete]
        public async Task<IActionResult> UnjoinActivityAsync([FromQuery] Guid activityId)
        {
            var request = new RemoveMemberOutOfActivityRequest()
            {
                ActivityId = activityId
            };

            var result = await _mediator.Send(request);
            return Ok(result);
        }
    }
}