using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Entities
{
    [Table("Zanr")]
    public class ZanrCreationDTO
    {
        public string Naziv { get; set; }
    }


}
