using System;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Services.Interfaces;
using FluentValidation;
using FrameworkCore.Extensions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Command.Users
{
  public class UploadAvatarCommandRequest:IRequest<bool>
  {
    public Guid Id { get; set; }
    public IFormFile Avatar { get; set; }
    public string RootPath { get; set; }
  }

  public class UploadAvatarCommandValidator: AbstractValidator<UploadAvatarCommandRequest>
  {
    public UploadAvatarCommandValidator()
    {
      RuleFor(x => x.Id).NotNull().NotEmpty();
      RuleFor(x => x.Avatar).NotNull().NotEmpty();
    }
  }

  public class UploadAvatarCommandHandler : IRequestHandler<UploadAvatarCommandRequest, bool>
  {
    private readonly ApplicationDbContext _dbContext;
    private readonly IFileService _fileService;

    public UploadAvatarCommandHandler(ApplicationDbContext dbContext, IFileService fileService)
    {
      _dbContext = dbContext;
      _fileService = fileService;
    }
    public async Task<bool> Handle(UploadAvatarCommandRequest request, CancellationToken cancellationToken)
    {
      var user = await _dbContext.AppUsers.FirstOrDefaultAsync(x => x.Id == request.Id);

      if (user == null) 
        throw new DomainException("User is not existed");

      if (!Directory.Exists(request.RootPath))
      {
        Directory.CreateDirectory(request.RootPath);
      }

      var currentDateTimeOffset = DateTimeOffset.UtcNow;
      var extension = request.Avatar.GetFileExtensionNoDot();

      var fileName = string.Concat(
        "avatar", "-", user.UserName.ToLower(), "-",
        Path.GetFileNameWithoutExtension(request.Avatar.FileName).ToLower(), "-",
        currentDateTimeOffset.ToUniversalTimeString(), ".", extension
      );
      var filePath = Path.Combine(request.RootPath, fileName);

      await _fileService.UploadFileAsync(request.Avatar, filePath);

      user.Avatar = fileName;
      await _dbContext.SaveChangesAsync();

      return true;
    }
  }
}