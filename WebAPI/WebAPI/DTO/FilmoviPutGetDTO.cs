using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Entities;

namespace WebAPI.DTO
{  
    public class FilmoviPutGetDTO
    {
        public FilmoviDTO filmovi { get; set; }
        public List<ZanrDTO> selectedZanr{ get; set; }
        public List<ZanrDTO> nonSelectedZanr{ get; set; }
        public List<SalaDTO> selectedSala { get; set; }
        public List<SalaDTO> nonSelectedSala { get; set; }
    }
}
