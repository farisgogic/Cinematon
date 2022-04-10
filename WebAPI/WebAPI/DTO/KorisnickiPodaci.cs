using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.DTO
{
    public class KorisnickiPodaci
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Lozinka { get; set; }
    }
}
