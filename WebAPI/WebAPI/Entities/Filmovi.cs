using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Entities
{
    public class Filmovi
    {
        public int Id { get; set; }
        [StringLength(maximumLength:100)]
        [Required]
        public string Naslov { get; set; }
        public Boolean naProgramu { get; set; }
        public Boolean uskoro { get; set; }
        public string Opis { get; set; }
        public string Trailer { get; set; }
        public DateTime Datum { get; set; }
        public string Poster { get; set; }
        public List<FilmoviZanr> FilmoviZanr{ get; set; }
        public int Cijena { get; set; }

        public List<FilmoviSala> FilmoviSala { get; set; }

    }
}
