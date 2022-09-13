using AutoMapper;
using Microsoft.AspNetCore.Identity;
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
                .ForMember(x => x.FilmoviZanr, options => options.MapFrom(MapFilmoviZanr))
                .ForMember(x=>x.FilmoviSala, options=>options.MapFrom(MapFilmoviSala));

            CreateMap<Filmovi, FilmoviDTO>()
                .ForMember(x => x.zanr, options => options.MapFrom(MapFilmoviZanr))
                .ForMember(x => x.sala, options => options.MapFrom(MapFilmoviSala));

            CreateMap<IdentityUser, KorisniciDTO>(); 

            CreateMap<Sala, SalaDTO>();
            CreateMap<SalaDTO, Sala>();

            CreateMap<SalaCreationDTO, Sala>();
            CreateMap<Sala, SalaCreationDTO>();

        }

        private List<SalaDTO> MapFilmoviSala(Filmovi filmovi, FilmoviDTO filmoviDTO)
        {
            var result = new List<SalaDTO>();

            if (filmovi.FilmoviSala != null)
            {
                foreach (var sala in filmovi.FilmoviSala)
                {
                    result.Add(new SalaDTO { id = sala.SalaId, ime = sala.Sala.ime});
                }
            }
              
            return result;
        }

        private List<ZanrDTO> MapFilmoviZanr(Filmovi filmovi, FilmoviDTO filmoviDTO)
        {
            var result = new List<ZanrDTO>();

            if (filmovi.FilmoviZanr != null)
            {
                foreach (var zanr in filmovi.FilmoviZanr)
                {
                    result.Add(new ZanrDTO { Id = zanr.ZanrId, Naziv = zanr.Zanr.Naziv });
                }
            }

            return result;
        }

        private List<FilmoviZanr> MapFilmoviZanr(FilmoviCreationDTO filmoviCreationDTO, Filmovi filmovi)
        {
            var result = new List<FilmoviZanr>();
            if (filmoviCreationDTO.FilmoviZanr == null) return result;

            foreach (var id in filmoviCreationDTO.FilmoviZanr)
                result.Add(new FilmoviZanr() { ZanrId = id });

            return result;
        }

        private List<FilmoviSala> MapFilmoviSala(FilmoviCreationDTO filmoviCreationDTO, Filmovi filmovi)
        {
            var result = new List<FilmoviSala>();
            if (filmoviCreationDTO.SalaId == null) { return result; }

            foreach (var id in filmoviCreationDTO.SalaId)
                result.Add(new FilmoviSala() { SalaId = id });

            return result;
        }

    }
}
