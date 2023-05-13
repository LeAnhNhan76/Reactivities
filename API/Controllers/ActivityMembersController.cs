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
    public class ActivityMembersController : ApiController
    {
        private readonly IMediator _mediator;
        public ActivityMembersController(IHttpContextAccessor context
          , IMediator mediator  
        ) : base(context)
        {
            _mediator = mediator;
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