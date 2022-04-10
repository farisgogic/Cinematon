using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.DTO
{
    public class PaginationDTO
    {
        public int Stranica { get; set; } = 1;
        public int zapisaPoStranici { get; set; } = 10;
        private readonly int maxZapisa = 50;
        public int ZapisiPoStranici
        {
            get
            {
                return zapisaPoStranici;
            }
            set
            {
                zapisaPoStranici = (value > maxZapisa) ? maxZapisa : value;
            }
        }
    }
}
