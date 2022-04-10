using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Entities
{
    public class OcjenaFilma
    {
        public int Id { get; set; }
        [Range(1,5)]
        public int Ocjena { get; set; }
        public int FilmoviId { get; set; }
        public Filmovi Filmovi { get; set; }
        public string KorisnikId { get; set; }
        public IdentityUser Korisnik { get; set; }
    }
}
