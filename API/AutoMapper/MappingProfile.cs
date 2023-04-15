using API.Dto;
using Application.Command.Activities;
using AutoMapper;
using Domain.Entities;

namespace API.AutoMapper
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            # region DTO & Request
            CreateMap<AddToActivityDto, AddToActivityCommandRequest>();

            #endregion

            #region  DTO & Entity
            
            #endregion
        }
    }
}