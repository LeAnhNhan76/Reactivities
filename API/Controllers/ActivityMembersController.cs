using System;
using System.Threading.Tasks;
using Application.Command;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class ActivityMembersControler : ApiController
    {
        private readonly IMediator _mediator;
        public ActivityMembersControler(IHttpContextAccessor context
          , IMediator mediator  
        ) : base(context)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> AddMemberToActivityAsync ([FromBody] Guid activityId)
        {
            var request = new AddMemberToActivityCommandRequest() {
                ActivityId = activityId,
                UserId = CurrentLoginUser.UserId
            };

            var result = await _mediator.Send(request);
            return Ok(result);
        }
    }
}