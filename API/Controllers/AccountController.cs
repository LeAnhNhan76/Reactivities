using System.Threading.Tasks;
using Application.Command;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers 
{
    [Route("api/[controller]")]
    public class AccountController: ApiController 
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
        public IActionResult Login() 
        {
            return Ok();
        }
    }
}