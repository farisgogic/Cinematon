using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.DTO
{
    public class AuthenticationResponse
    {
        public string Token { get; set; }
        public DateTime DatumIsteka { get; set; }
    }
}
