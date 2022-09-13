using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebAPI.DTO;
using WebAPI.Entities;
using WebAPI.Helpers;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalaController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public SalaController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<SalaDTO>>> Get()
        {
            var entities = await context.Sala.ToListAsync();
            return mapper.Map<List<SalaDTO>>(entities);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SalaDTO>> GetById(int id)
        {
            var sala = await context.Sala.FirstOrDefaultAsync(x => x.id == id);
            if (sala == null)
                return NotFound();

            return mapper.Map<SalaDTO>(sala);
        }

        [HttpPost]
        public async Task<ActionResult<SalaDTO>> Post(SalaCreationDTO salaCreationDTO)
        {
            var sala = mapper.Map<Sala>(salaCreationDTO);
            context.Add(sala);
            await context.SaveChangesAsync();
            return Ok(sala.ime);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<SalaDTO>> Put(int id, SalaCreationDTO salaCreationDTO)
        {
            var sala = await context.Sala.FirstOrDefaultAsync(x => x.id == id);
            if (sala == null)
                return NotFound();

            sala = mapper.Map(salaCreationDTO, sala);
            await context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var sala = await context.Sala.FirstOrDefaultAsync(x => x.id == id);

            if (sala == null)
                return NotFound();

            context.Remove(sala);
            await context.SaveChangesAsync();
            return Ok();
        }

    }
}
