using Microsoft.AspNetCore.Http;

namespace FrameworkCore.Extensions
{
    public static class HttpContextExt
    {
        public static string GetFullHostServer (this HttpRequest request) 
        {
            return string.Concat(request.Scheme, "://", request.Host, request.PathBase);
        }
    }
}