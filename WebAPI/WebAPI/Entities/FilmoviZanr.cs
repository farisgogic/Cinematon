using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Entities
{
    public class FilmoviZanr
    {
        public int ZanrId { get; set; }
        public int FilmoviId { get; set; }
        public Zanr Zanr { get; set; }
        public Filmovi Filmovi { get; set; }
    }
}
