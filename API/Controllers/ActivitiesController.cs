using Application.Command.Activities;
using Application.Query.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class ActivitiesController : ApiController
    {
        private readonly IMediator _mediator;

        public ActivitiesController(IHttpContextAccessor context, IMediator mediator): base(context)
        {
            this._mediator = mediator;
        }

        /// <summary>
        /// Get all the list activities
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [ProducesResponseType(typeof(IReadOnlyCollection<Activity>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAll()
        {
            var request = new GetAllActivityQueryRequest();

            var response = await _mediator.Send(request, HttpContext.RequestAborted);

            return Ok(response);
        }

        /// <summary>
        /// Get the activity detail by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id:guid}")]
        [ProducesResponseType(typeof(Activity), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status204NoContent)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetById(Guid id)
        {
            var request = new GetByIdActivityQueryRequest() { Id = id };

            var response = await _mediator.Send(request, HttpContext.RequestAborted);
            return Ok(response);
        }

        /// <summary>
        /// Add new activity
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Add([FromBody] AddToActivityCommandRequest request)
        {
            var response = await _mediator.Send(request, HttpContext.RequestAborted);
            return Ok(response);
        }

        /// <summary>
        /// Edit activity
        /// </summary>
        /// <param name="id"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPut("{id:guid}")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Edit(Guid id, [FromBody] EditActivityCommandRequest request)
        {
            if (id != request.Id)
                throw new Exception("Bad request");

            var response = await _mediator.Send(request, HttpContext.RequestAborted);
            return Ok(response);
        }

        /// <summary>
        /// Delete activity
        /// </summary>
        /// <param name="id"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpDelete("{id:guid}")]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Delete(Guid id)
        {
            var request = new DeleteActivityCommandRequest { Id = id };

            var response = await _mediator.Send(request, HttpContext.RequestAborted);
            return Ok(response);
        }
    }
}