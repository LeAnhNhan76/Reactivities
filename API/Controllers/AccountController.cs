using System.Threading.Tasks;
using Application.Command.Account;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers 
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController: ControllerBase 
    {
        private IMediator _mediator;
        public AccountController(IMediator mediator)
        {
            this._mediator = mediator;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterCommandRequest request) 
        {
            if (request == null || string.IsNullOrEmpty(request.UserName) 
              || string.IsNullOrEmpty(request.Password)) return BadRequest();

            var result = await this._mediator.Send(request);
            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginCommandRequest request) 
        {
            if(request == null || string.IsNullOrEmpty(request.UserName) 
              || string.IsNullOrEmpty(request.Password)) return BadRequest();

            var result = await this._mediator.Send(request);
            return Ok(result);
        }
    }
}