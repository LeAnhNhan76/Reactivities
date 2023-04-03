using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using FrameworkCore.Constants;
using MediatR;
using Persistence;

namespace Application.Command
{
    public class RegisterCommandRequest: IRequest<bool> 
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }

    public class RegisterCommandHandler : IRequestHandler<RegisterCommandRequest, bool>
    {
        private readonly ApplicationDbContext _dbContext;

        public RegisterCommandHandler(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }
        public async Task<bool> Handle(RegisterCommandRequest request, CancellationToken cancellationToken)
        {
            if (!ValidateRegisterInfo(request)) return false;

            return true;
        }

        private bool ValidateRegisterInfo (RegisterCommandRequest info)
        {
            if(info == null | string.IsNullOrEmpty(info.UserName) | string.IsNullOrEmpty(info.Password)) return false;

            var user = this._dbContext.AppUsers.FirstOrDefault(x => x.UserName == info.UserName);

            if (user != null) return false;

            if(!ValidatePassword(info.Password)) return false;

            return true;
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