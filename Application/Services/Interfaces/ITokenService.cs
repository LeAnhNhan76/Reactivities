namespace Application.Service
{
  public interface ITokenService
  {
    string CreateToken(AppUser user);
  }
}