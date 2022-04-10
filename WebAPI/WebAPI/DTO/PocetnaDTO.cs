using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.DTO
{
    public class PocetnaDTO
    {
        public List<FilmoviDTO> uskoro{ get; set; }
        public List<FilmoviDTO> naProgramu{ get; set; }
    }
}
