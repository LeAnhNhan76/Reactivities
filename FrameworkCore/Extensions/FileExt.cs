using System.IO;
using Microsoft.AspNetCore.Http;

namespace FrameworkCore.Extensions
{
  public static class FileExt
  {
    public static string GetFileExtensionNoDot(this IFormFile file) 
    {
      if (file == null) return string.Empty;

      return Path.GetExtension(file.FileName).Replace(".", "");
    }
  }
}