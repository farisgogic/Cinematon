using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Helpers;

namespace WebAPI.DTO
{
    public class FilmoviCreationDTO
    {
        public string Naslov { get; set; }
        public string Opis { get; set; }
        public Boolean naProgramu { get; set; }
        public Boolean uskoro { get; set; }

        public string Trailer { get; set; }
        public DateTime Datum { get; set; }
        public int Cijena { get; set; }


        public IFormFile Poster { get; set; }
        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> FilmoviZanr { get; set; }



        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> SalaId { get; set; }

    }
}
