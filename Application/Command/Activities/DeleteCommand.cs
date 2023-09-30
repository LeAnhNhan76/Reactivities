using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Command.Activities
{
    public class DeleteActivityCommandRequest : IRequest<bool>
    {
        public Guid Id { get; set; }
    }

    public class DeleteActivityCommandHandler : IRequestHandler<DeleteActivityCommandRequest, bool>
    {
        private readonly ApplicationDbContext _dbContext;

        public DeleteActivityCommandHandler(ApplicationDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

        public async Task<bool> Handle(DeleteActivityCommandRequest request, CancellationToken cancellationToken)
        {
            var activity = await _dbContext.Activities.FirstOrDefaultAsync(x => x.Id == request.Id);

            if (activity == null)
                throw new Exception("The item is not found!");

            _dbContext.Activities.Remove(activity);
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
}