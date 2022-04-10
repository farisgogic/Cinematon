using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.DTO
{
    public class OcjenaFilmaDTO
    {
        [Range(1,5)]
        public int Ocjena { get; set; }
        public int FilmoviId { get; set; }
    }
}
