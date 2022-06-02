using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Command.Activities
{
    public class DeleteActivityCommandRequest : IRequest
    {
        public Guid Id { get; set; }
    }

    public class DeleteActivityCommandHandler : IRequestHandler<DeleteActivityCommandRequest>
    {
        private readonly ApplicationDbContext _context;
        public DeleteActivityCommandHandler(ApplicationDbContext context)
        {
            this._context = context;
        }

        public async Task<Unit> Handle(DeleteActivityCommandRequest request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FirstOrDefaultAsync(x => x.Id == request.Id);

            if (activity == null)
                throw new Exception("The item is not found!");

            _context.Activities.Remove(activity);
            var success = await _context.SaveChangesAsync() >  0;

            if (success) return Unit.Value;
            throw new Exception("Problem saving changes");
        }
    }
}