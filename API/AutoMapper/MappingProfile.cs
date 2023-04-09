using API.Dto;
using Application.Command.Activities;
using AutoMapper;

namespace API.AutoMapper
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<AddToActivityDto, AddToActivityCommandRequest>();
        }
    }
}