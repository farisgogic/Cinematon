using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Entities;

namespace WebAPI.DTO
{
    public class FilmoviDTO
    {
        public int Id { get; set; }
        public string naslov { get; set; }
        public Boolean naProgramu { get; set; }
        public Boolean uskoro { get; set; }
        public string opis { get; set; }
        public string trailer { get; set; }
        public DateTime datum { get; set; }
        public string poster { get; set; }
        public double prosjecnaOcjena { get; set; }
        public double korisnickaOcjena { get; set; }
        public int cijena { get; set; }
        public List<ZanrDTO> zanr{ get; set; }
        public List<SalaDTO> sala { get; set; }


    }
}
