
using System.Linq;
using API.Model;
using FrameworkCore.Constants;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace API.Controllers 
{
    [ApiController]
    public class ApiController: ControllerBase 
    {
      protected readonly TokenInfo CurrentLoginUser;

      public ApiController(IHttpContextAccessor context)
      {
        var userId = context?.HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == ReactivitiesClaimTypes.CurrentUserId);
        var userName = context?.HttpContext?.User?.Claims?.FirstOrDefault(x => x.Type == ReactivitiesClaimTypes.CurrentUserName);

        if (userId != null) 
        {
          CurrentLoginUser = new TokenInfo {
            UserId = new Guid(userId.Value)
          };

          if(userName != null) 
          {
            CurrentLoginUser.UserName = userName.Value;
          }
        }
      }
    }
}