using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.DTO
{
    public class FilmoviFilterDTO
    {
        public string naziv { get; set; }
        public int ZanrId { get; set; }
        public bool uskoro { get; set; }
        public bool naProgramu { get; set; }
    }
}
