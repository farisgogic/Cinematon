using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Entities
{
    public class Sjediste
    {
        [Key]
        public int Id { get; set; }
        public int Red { get; set; }
        public int Kolona { get; set; }
    }
}
