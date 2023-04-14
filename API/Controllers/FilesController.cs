using System.IO;
using FrameworkCore.Constants;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FilesController: ControllerBase
    {
        private readonly IWebHostEnvironment _env;
        public FilesController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [HttpGet]
        public IActionResult GetFile([FromQuery] string path)
        {
            var filePath = Path.Combine(_env.ContentRootPath, FileConstants.BaseDirectory, path);

            if (!System.IO.File.Exists(filePath))
                return NotFound();

            var fileName = Path.GetFileName(filePath);
            var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);

            return File(fileStream, FileConstants.MimeTypeImage, fileName);
        }
    }
}