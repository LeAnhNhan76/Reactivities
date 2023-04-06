using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using FrameworkCore.Constants;
using MediatR;
using Persistence;
using System;

namespace Application.Command.Account
{
    public class RegisterCommandRequest: IRequest<RegisterCommandResponse> 
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string NickName { get; set; }
        public string Email { get; set; }
    }

    public class RegisterCommandResponse
    {
        public bool IsRegistered { get; set; }

        public string ErrorMessage { get; set; }
    }

    public class RegisterCommandHandler : IRequestHandler<RegisterCommandRequest, RegisterCommandResponse>
    {
        private readonly ApplicationDbContext _dbContext;

        public RegisterCommandHandler(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
        public async Task<RegisterCommandResponse> Handle(RegisterCommandRequest request, CancellationToken cancellationToken)
        {
            var (isValid, message) = ValidateRegisterInfo(request);

            if (!isValid) return new RegisterCommandResponse {
              IsRegistered = false,
              ErrorMessage = message
            };
            
            try
            {
              using(var hmac = new HMACSHA512()) 
            {
              var newUser = new AppUser 
              {
                Id = Guid.NewGuid(),
                UserName = request.UserName,
                Password = hmac.ComputeHash(Encoding.UTF8.GetBytes(request.UserName)),
                PasswordSalt = hmac.Key,
                FirstName = request.FirstName,
                LastName = request.LastName,
                NickName = request.NickName,
                Email = request.Email,
                CreatedBy = new Guid(Constant.SYSTEM_USER_ID),
                CreatedDate = DateTime.Now
              };

              await this._dbContext.AppUsers.AddAsync(newUser);
              await this._dbContext.SaveChangesAsync();

              return new RegisterCommandResponse {
                IsRegistered = true,
                ErrorMessage = string.Empty
              };
            }
            }
            catch (Exception ex)
            {
              return new RegisterCommandResponse {
                IsRegistered = false, 
                ErrorMessage = ex.ToString()
              };
            }
        }

        private (bool isValid, string message) ValidateRegisterInfo (RegisterCommandRequest info)
        {
            if(info == null | string.IsNullOrEmpty(info.UserName) | string.IsNullOrEmpty(info.Password)) return (false, "BadRequest");

            var user = this._dbContext.AppUsers.FirstOrDefault(x => x.UserName == info.UserName || x.Email == info.Email);

            if (user != null) return (false, "UserIsExisted");

            if(!ValidatePassword(info.Password)) return (false, "InvalidPassword");

            return (true, string.Empty);
        }

        private bool ValidatePassword (string password)
        {
            if (password.Length <= Constant.MaxPasswordLength) return false;

            var hasNumber = new Regex(@"[0-9]+");
            var hasUpperChar = new Regex(@"[A-Z]+");
            var hasMinimum8Chars = new Regex(@".{8,}");

            return hasNumber.IsMatch(password) && hasUpperChar.IsMatch(password) && hasMinimum8Chars.IsMatch(password);
        }
    }
}