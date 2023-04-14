using System.IO;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Services.Interfaces;
using FrameworkCore.Constants;
using Microsoft.AspNetCore.Http;

namespace Application.Services
{
  public class FileService: IFileService
  {
    public async Task<bool> UploadFileAsync(IFormFile file, string filePath)
    {
      if (file == null || file.Length == 0)
        throw new DomainException("Invalid file");

      if (!file.ContentType.StartsWith("image/"))
        throw new DomainException("Invalid file type");

      if (file.Length > 10 * FileConstants.MB)
        throw new DomainException("File is too large, only max 10MB");

      if (string.IsNullOrEmpty(filePath))
        throw new DomainException("File path is empty");

      using (var stream = new FileStream(filePath, FileMode.CreateNew))
      {
        await file.CopyToAsync(stream);
      }

      return true;
    }
  }
}