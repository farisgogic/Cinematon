using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebAPI.Migrations;

namespace WebAPI.Entities
{
    public partial class Klupa
    {

        public int id { get; set; }
        public int red { get; set; }
        public int kolona { get; set; }

        public string email { get; set; }
        public IdentityUser korisnik { get; set; }

        public bool zauzeto { get; set; }

        public int filmoviId { get; set; }

        public int salaId { get; set; }
        public virtual Sala Sala { get; set; }

    }
}
