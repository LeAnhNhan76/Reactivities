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

        [HttpGet("{activityId:guid}")]
        public async Task<IActionResult> GetMembersJoinActivity(Guid activityId) 
        {
            var request = new GetMembersJoinActivityRequest() {
                ActivityId = activityId
            };

            var result = await _mediator.Send(request);
            
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> AddMemberToActivityAsync ([FromBody] AddMemberToActivityRequest model)
        {
            var request = new AddMemberToActivityCommandRequest() {
                ActivityId = model.ActivityId,
                UserId = CurrentLoginUser.UserId
            };

            var result = await _mediator.Send(request);
            return Ok(result);
        }
    }
}