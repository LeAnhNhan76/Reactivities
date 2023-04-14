using System;

namespace FrameworkCore.Constants
{
  public static class FileConstants
  {
    public static int Byte => 1024;
    public static int MB => (int)Math.Pow(Byte, 2);
    public static string BaseDirectory = "UploadFiles";
    public static string UserAvatarsFolder = "User/Avatars";
    public static string MimeTypeImage = "application/octet-stream";
  }
}