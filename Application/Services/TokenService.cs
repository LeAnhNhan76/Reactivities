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
using Persistence;
using System.Security.Cryptography;

namespace Application.Services
{
  public class TokenService : ITokenService
  {
    private readonly SymmetricSecurityKey _key;
    private readonly ApplicationDbContext _dbContext;
    public TokenService(IConfiguration config, ApplicationDbContext dbContext)
    {
      this._key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config[Constant.TokenKey]));
      this._dbContext = dbContext;
    }

    public (string token, string refreshToken) GenerateTokens(AppUser user)
    {
      var token = GenerateToken(user);
      var refreshToken = GenerateRefreshToken();

      return (token, refreshToken);
    }

    private string GenerateToken(AppUser user)
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

    private string GenerateRefreshToken()
    {
      var randomNumber = new byte[32];
      using (var rng = RandomNumberGenerator.Create())
      {
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
      }
    }
  }
}