using System.IdentityModel.Tokens.Jwt;
using System.Text;
using FrameworkCore.Constants;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using Domain.Entities;
using Application.Services.Interfaces;

namespace Application.Services
{
  public class TokenService : ITokenService
  {
    private readonly SymmetricSecurityKey _key;
    public TokenService(IConfiguration config)
    {
      this._key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config[Constant.TokenKey]));
    }
    public string CreateToken(AppUser user)
    {
      var claims = new List<Claim>() 
      {
        new Claim(ReactivitiesClaimTypes.CurrentUserId, user.Id.ToString()),
        new Claim(ReactivitiesClaimTypes.CurrentUserName, user.UserName),
      };

      var creds = new SigningCredentials(this._key, SecurityAlgorithms.HmacSha512Signature);

      var tokenDescriptor = new SecurityTokenDescriptor() 
      {
        Subject = new ClaimsIdentity(claims),
        Expires = DateTimeOffset.UtcNow.AddDays(7).UtcDateTime,
        SigningCredentials = creds
      };

      var tokenHandler = new JwtSecurityTokenHandler();

      SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

      return tokenHandler.WriteToken(token);
    }
  }
}