using Domain.Entities;

namespace Application.Services.Interfaces
{
  public interface ITokenService
  {
    (string token, string refreshToken) GenerateTokens(AppUser user);
  }
}