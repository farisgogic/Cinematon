using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
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
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
    public class ZanrController : ControllerBase
    {
        private readonly ILogger<ZanrController> logger;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public ZanrController(ILogger<ZanrController> logger,
            ApplicationDbContext context, IMapper mapper)
        {
            this.logger = logger;
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<List<ZanrDTO>>> Get()
        {
            logger.LogInformation("Prikazivanje svih zanrova");

            var zanr = await context.Zanr.OrderBy(x=>x.Naziv).ToListAsync();

            return mapper.Map<List<ZanrDTO>>(zanr);
        }

        [HttpGet("{id}")]
        public ActionResult<ZanrDTO> GetById(int id)
        {
            return Ok(context.Zanr.FirstOrDefault(x=>x.Id==id));
        }
        
        [HttpPost]
        public ActionResult<Zanr> Post([FromBody] ZanrCreationDTO zanr)
        {
            
            Zanr newZanr = new Zanr
            {
                Naziv=zanr.Naziv
            };

            context.Add(newZanr);
            context.SaveChanges();
            return newZanr;
        }
        
        [HttpPut("{id}")]
        public async Task<ActionResult> Put([FromBody] ZanrCreationDTO zanrCreation, int id)
        {
            Zanr zanr;

            if (id == 0)
            {
                zanr = new Zanr
                {
                    Id=id,
                    Naziv=zanrCreation.Naziv
                };
                context.Add(zanr);
            }
            else
            {
                zanr = context.Zanr.FirstOrDefault(x => x.Id == id);
                if (zanr == null)
                    return BadRequest("pogresan id");
            }

            zanr.Naziv = zanrCreation.Naziv;

            await context.SaveChangesAsync();
            return NoContent();
        }
        
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var zanr = await context.Zanr.FirstOrDefaultAsync(x => x.Id == id);

            if (zanr == null)
                return NotFound();

            context.Remove(zanr);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
