using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using ValidationException = Application.Exceptions.ValidationException;
using ApplicationException = Domain.Exceptions.ApplicationException;
using System.Collections.Generic;
using System.Text.Json;

namespace API.Middleware
{
    public sealed class ExceptionHandlingMiddleware : IMiddleware
    {
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;
        public ExceptionHandlingMiddleware(ILogger<ExceptionHandlingMiddleware> logger)
        {
            _logger = logger;
        }
        public async Task InvokeAsync(HttpContext httpContext, RequestDelegate next)
        {
            try
            {
                await next(httpContext);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private static async Task HandleExceptionAsync(HttpContext httpContext, Exception exception)
        {
            var statusCode = GetErrorCode(exception);

            var errors = new 
            {
                title = GetTitle(exception),
                status = statusCode,
                detail = exception.Message,
                errors = GetErrors(exception)
            };

            httpContext.Response.ContentType = "application/json";

            httpContext.Response.StatusCode = statusCode;

            await httpContext.Response.WriteAsync(JsonSerializer.Serialize(errors));
        }

        private static string GetTitle(Exception exception)
        {
            if (exception is ApplicationException applicationException) return applicationException.Title;
            
            return "Server Error";
        }

        private static int GetErrorCode(Exception exception)
        {
            if (exception is ValidationException) return StatusCodes.Status422UnprocessableEntity;

            return StatusCodes.Status500InternalServerError;
        }

        private static IReadOnlyDictionary<string, string[]> GetErrors(Exception exception)
        {
            IReadOnlyDictionary<string, string[]> errors = null;

            if (exception is ValidationException validationException)
            {
                errors = validationException._errorsDictionary;
            }

            return errors;
        }
    }
}