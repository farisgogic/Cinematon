using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.DTO;
using WebAPI.Entities;
using System.Web.Http.Cors;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class SjedisteController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public SjedisteController(ApplicationDbContext context)
        {
            this.context = context;
        }


        [HttpGet]
        public ActionResult<List<Klupa>> GetAll()
        {
            var sjedista = context.Klupa.ToList();
          

            return Ok(sjedista);
        }

        [HttpGet("{id}")]
        public ActionResult GetById(int id)
        {
            var sjediste = context.Klupa.Find(id);

            if (sjediste == null)
                return BadRequest("sjediste ne postoji");
            
            return Ok(sjediste);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody]KlupaDTO x)
        {
            var sjediste = await context.Klupa.FirstOrDefaultAsync(x=>x.id==id);
            if (sjediste == null)
                return BadRequest("sjediste ne postoji");

            sjediste.zauzeto = x.zauzeto;
            sjediste.email = x.email;
            sjediste.filmoviId = x.filmoviId;
                
            await context.SaveChangesAsync();
            return Ok(GetById(sjediste.id));
        }

       
    }
}
