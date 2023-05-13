using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [Authorize]
    public class SettingController : ApiController
    {
        public SettingController(IHttpContextAccessor context) : base(context)
        {
        }

        [HttpGet]
        public IActionResult Ping() 
        {
            return Ok();
        }
    }
}