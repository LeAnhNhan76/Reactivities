using API.Dto;
using Application.Command;
using Application.Command.Activities;
using Application.Query.Activities;
using AutoMapper;
using Domain.Entities;
using FrameworkCore.Extensions;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
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
        private readonly IMapper _mapper;

        public ActivitiesController(IHttpContextAccessor context,
         IMediator mediator, IMapper mapper, IWebHostEnvironment env): base(context)
        {
            this._mediator = mediator;
            this._mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IReadOnlyCollection<Activity>), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAll()
        {
            var request = new GetAllActivityQueryRequest() {
                Hosting = Request.GetFullHostServer()
            };

            var response = await _mediator.Send(request, HttpContext.RequestAborted);

            return Ok(response);
        }

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

        [HttpPost]
        [ProducesResponseType(typeof(bool), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> Add([FromBody] AddToActivityDto dto)
        {
            var request = this._mapper.Map<AddToActivityCommandRequest>(dto);
            request.HostId = CurrentLoginUser.UserId;
            var response = await _mediator.Send(request, HttpContext.RequestAborted);
            return Ok(response);
        }

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

        [HttpPatch("cancel")]
        public async Task<IActionResult> CancelActivity([FromBody] Guid activityId)
        {
            var request = new CancelActivityCommandRequest {
                ActivityId = activityId,
                UserId = CurrentLoginUser.UserId
            };

            var response = await _mediator.Send(request);
            return Ok(response);
        }
    }
}