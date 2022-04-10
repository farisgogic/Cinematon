using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.DTO;
using WebAPI.Entities;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OcjenaFilmaController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly UserManager<IdentityUser> userManager;

        public OcjenaFilmaController(ApplicationDbContext context, UserManager<IdentityUser> userManager)
        {
            this.context = context;
            this.userManager = userManager;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> Post([FromBody] OcjenaFilmaDTO ocjenaFilmaDTO)
        {
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
            var korisnik = await userManager.FindByEmailAsync(email);
            var korisnikId = korisnik.Id;

            var trenutnaOcjena = await context.OcjenaFilma.FirstOrDefaultAsync(x => x.FilmoviId == ocjenaFilmaDTO.Ocjena && x.KorisnikId == korisnikId);

            if (trenutnaOcjena == null)
            {
                var ocjena = new OcjenaFilma();
                ocjena.FilmoviId = ocjenaFilmaDTO.FilmoviId;
                ocjena.Ocjena = ocjenaFilmaDTO.Ocjena;
                ocjena.KorisnikId = korisnikId;
                context.Add(ocjena);
            }
            else
            {
                trenutnaOcjena.Ocjena = ocjenaFilmaDTO.Ocjena;
            }

            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
