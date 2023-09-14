using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace Application.Services.Interfaces
{
  public interface IFileService
  {
    Task<bool> UploadFileAsync(IFormFile file, string path);
  }
}