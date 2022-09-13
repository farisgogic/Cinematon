using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Entities;

namespace WebAPI.DTO
{
    public class FilmoviPostGetDTO
    {
        public List<ZanrDTO> Zanr { get; set; }
        public List<SalaDTO> Sala { get; set; }
    }
}
