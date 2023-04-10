using System;

namespace Domain.Exceptions
{
    public abstract class ApplicationException: Exception
    {
        public readonly string Title;
        public ApplicationException(string title, string message): base(message)
        {
            Title = title;
        }
    }
}