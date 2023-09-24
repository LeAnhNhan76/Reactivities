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
    public class FollowersController : ApiController
    {
        private readonly IMediator _mediator;
        public FollowersController(IHttpContextAccessor context,
            IMediator mediator) : base(context)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> FollowUserAsync([FromQuery] Guid userId)
        {
            var request = new FollowUserCommandRequest
            {
                UserId = userId,
                FollowerId = CurrentLoginUser.UserId
            };

            var result = await _mediator.Send(request);

            return Ok(result);
        }

        [HttpDelete]
        public async Task<IActionResult> UnFollowUserAsync([FromQuery] Guid userId)
        {
            var request = new UnFollowUserCommandRequest
            {
                UserId = userId,
                FollowerId = CurrentLoginUser.UserId
            };

            var result = await _mediator.Send(request);

            return Ok(result);
        }
    }
}