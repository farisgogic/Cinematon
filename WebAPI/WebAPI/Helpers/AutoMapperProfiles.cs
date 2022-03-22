using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.DTO;
using WebAPI.Entities;

namespace WebAPI.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<ZanrDTO, Zanr>().ReverseMap();

            CreateMap<FilmoviCreationDTO, Filmovi>()
                .ForMember(x => x.Poster, options => options.Ignore())
                .ForMember(x => x.FilmoviZanr, options => options.MapFrom(MapFilmoviZanr));
                
        }

        private List<FilmoviZanr> MapFilmoviZanr(FilmoviCreationDTO filmoviCreationDTO, Filmovi filmovi)
        {
            var result = new List<FilmoviZanr>();
            if (filmoviCreationDTO.ZanrId == null) return result;

            foreach (var id in filmoviCreationDTO.ZanrId)
                result.Add(new FilmoviZanr() { ZanrId = id });

            return result;
        }
    }
}
