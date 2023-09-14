using Domain.Entities;

namespace Application.Services.Interfaces
{
  public interface ITokenService
  {
    string CreateToken(AppUser user);
  }
}