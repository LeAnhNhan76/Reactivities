using Domain.Exceptions;

namespace Application.Exceptions
{
  public class DomainException : ApplicationException
  {
    public DomainException(string message) : base("Domain Exception", message)
    {
    }
  }
}