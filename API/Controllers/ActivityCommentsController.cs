using System;
using System.Threading.Tasks;
using Application.Command.ActivityComments;
using Application.Query.ActivityComments;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class ActivityCommentsController : ApiController
    {
        private readonly IMediator _mediator;
        public ActivityCommentsController(IHttpContextAccessor context, IMediator mediator) : base(context)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> AddCommentAsync([FromBody] AddCommentRequest request)
        {
            var addResult = await _mediator.Send(request);
            return Ok(addResult);
        }

        [HttpGet("{activityId:guid}")]
        public async Task<IActionResult> GetCommentsOfActivity(Guid activityId)
        {
            var request = new GetCommentsOfActivityRequest
            {
                ActivityId = activityId
            };
            var result = await _mediator.Send(request);
            return Ok(result);
        }
    }
}