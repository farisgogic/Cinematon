using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Entities
{
    public class Rezervacija
    {
        [Key]
        public int Id { get; set; }

        public string KorisnikId { get; set; }
        public IdentityUser Korisnik { get; set; }

        public int FilmoviId { get; set; }
        public Filmovi Filmovi { get; set; }

        public int SjedisteId { get; set; }
        public Sjediste Sjediste { get; set; }
    }
}
