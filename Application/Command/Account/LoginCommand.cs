using System.Security.Cryptography;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Service;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Command.Account
{
  public class LoginCommandRequest: IRequest<LoginCommandResponse>
  {
    public string UserName { get; set; }
    public string Password { get; set; }
  }
  public class LoginCommandResponse
  {
    public string UserName { get; set; }
    public string DisplayName { get; set; }
    public bool IsLoggedIn { get; set;}
    public string Token { get; set; }
    
  }

  public class LoginCommandHandler : IRequestHandler<LoginCommandRequest, LoginCommandResponse>
  {
    private readonly ApplicationDbContext _dbContext;
    private readonly ITokenService _tokenService;
    public LoginCommandHandler(ApplicationDbContext dbContext, ITokenService tokenService)
    {
      this._dbContext = dbContext;
      this._tokenService = tokenService;
    }
    public async Task<LoginCommandResponse> Handle(LoginCommandRequest request, CancellationToken cancellationToken)
    {
      var response = new LoginCommandResponse {
        UserName = request.UserName,
        IsLoggedIn = false,
        Token = string.Empty
      };

      if (request == null || string.IsNullOrEmpty(request.UserName) || string.IsNullOrEmpty(request.Password)) return response;

      var user = await this._dbContext.AppUsers.FirstOrDefaultAsync(x => x.UserName == request.UserName);
      if(user == null) return response;

      using(var hmac = new HMACSHA512(user.PasswordSalt))
      {
        var encryptedPassword = hmac.ComputeHash(Encoding.UTF8.GetBytes(request.Password));

        var isValidPwd = true;

        for(var i = 0; i < encryptedPassword.Length; i++) {
          if (user.Password[i] != encryptedPassword[i]) {
            isValidPwd = false;
            break;
          }
        }
        
        if (!isValidPwd) return response;

        response.IsLoggedIn = true;
        response.DisplayName = user.DisplayName;
        response.Token = this._tokenService.CreateToken(user);

        return response;
      }
    }
  }

}