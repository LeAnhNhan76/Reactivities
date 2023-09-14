using System;
using System.IO;
using System.Threading.Tasks;
using Application.Command.Users;
using FrameworkCore.Constants;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [Route("api/[controller]")]
  [Authorize]
  public class UsersController : ApiController
  {
    private readonly IMediator _mediator;
    private readonly IWebHostEnvironment _env;
    public UsersController(IHttpContextAccessor context
      , IMediator mediator
      , IWebHostEnvironment env) : base(context)
    {
      _mediator = mediator;
      _env = env;
    }

    [HttpPost("{id:guid}/avatar")]
    public async Task<IActionResult> UploadAvatar(Guid id, [FromForm] IFormFile file) 
    {
      var request = new UploadAvatarCommandRequest() {
        Id = id,
        Avatar = file,
        RootPath = Path.Combine(_env.ContentRootPath,
          FileConstants.BaseDirectory,
          FileConstants.UserAvatarsFolder)
      };

      var result = await _mediator.Send(request);
      return Ok(result);
    }
  }
}