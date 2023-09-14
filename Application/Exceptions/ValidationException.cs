using System.Collections.Generic;
using Domain.Exceptions;

namespace Application.Exceptions
{
    public class ValidationException: ApplicationException
    {
        public IReadOnlyDictionary<string, string[]> _errorsDictionary;
        public ValidationException(IReadOnlyDictionary<string, string[]> errorsDictionary)
            : base("Validation Failure", "One or more validation errors ocurred!")
        {
            _errorsDictionary = errorsDictionary;
        }
    }
}