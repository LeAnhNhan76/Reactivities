using System;

namespace FrameworkCore.Extensions
{
  public static class DateExt
  {
    public static string ToUniversalTimeString(this DateTimeOffset dateTime, string format = "yyyMMddHHmmssfff")
    {
      return dateTime.ToUniversalTime().ToString(format);
    }
  }
}