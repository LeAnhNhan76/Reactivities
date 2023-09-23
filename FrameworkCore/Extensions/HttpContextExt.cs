using System;
using System.Linq;
using FrameworkCore.Constants;
using Microsoft.AspNetCore.Http;

namespace FrameworkCore.Extensions
{
    public static class HttpContextExt
    {
        public static string GetFullHostServer(this HttpRequest request)
        {
            return string.Concat(request.Scheme, "://", request.Host, request.PathBase);
        }

        public static Guid CurrentUserId(this HttpContext context)
        {
            if (context == null) return Guid.Empty;

            var userId = context?.User.Claims.FirstOrDefault(x => x.Type == ReactivitiesClaimTypes.CurrentUserId);

            if (userId == null) return Guid.Empty;

            return new Guid(userId.Value);
        }
    }
}