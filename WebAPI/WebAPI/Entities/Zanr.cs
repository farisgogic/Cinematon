using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Validations;

namespace WebAPI.Entities
{
    public class Zanr
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Polje je obavezno")]
        [StringLength(50)]
        [PrvoSlovoVeliko]
        public string Naziv { get; set; }
    }

}
