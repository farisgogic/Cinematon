using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebAPI.Migrations;

namespace WebAPI.Entities
{
    public partial class Sala
    {
        public Sala()
        {
            Sjedista = new HashSet<Klupa>();
        }

        public int id { get; set; }
        public string ime { get; set; }


        public virtual ICollection<Klupa> Sjedista { get; set; }
    }
}
