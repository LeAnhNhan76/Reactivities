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
        public IActionResult Register() 
        {
            return Ok();
        }

        [HttpPost("login")]
        public IActionResult Login() 
        {
            return Ok();
        }
    }
}