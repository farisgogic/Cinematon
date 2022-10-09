using AutoMapper;
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
using WebAPI.Helpers;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
    public class FilmoviController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private readonly IFileStorageService fileStorageService;
        private readonly UserManager<IdentityUser> userManager;
        private string container = "filmovi";

        public FilmoviController(ApplicationDbContext context, IMapper mapper, IFileStorageService fileStorageService,
            UserManager<IdentityUser> userManager)
        {
            this.context = context;
            this.mapper = mapper;
            this.fileStorageService = fileStorageService;
            this.userManager = userManager;
        }

        [HttpGet("PostGet")]
        public async Task<ActionResult<FilmoviPostGetDTO>> PostGet()
        {
            var zanr = await context.Zanr.OrderBy(x=>x.Naziv).ToListAsync();
            var sala = await context.Sala.OrderBy(x => x.ime).ToListAsync();

            var zanrDTO = mapper.Map<List<ZanrDTO>>(zanr);
            var salaDTO = mapper.Map<List<SalaDTO>>(sala);

            return new FilmoviPostGetDTO() { Zanr = zanrDTO, Sala = salaDTO };
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<PocetnaDTO>> Get()
        {
            var top = 6;
            var today = DateTime.Today;
            

            var uskoro = await context.Filmovi.Where(x => x.Datum > today).OrderBy(x => x.Datum)
                .Take(top).ToListAsync();

            var naProgramu = await context.Filmovi.Where(x => x.naProgramu).OrderBy(x => x.Datum)
                .Take(top).ToListAsync();


            var pocetnaDTO = new PocetnaDTO();
            pocetnaDTO.uskoro = mapper.Map<List<FilmoviDTO>>(uskoro);
            pocetnaDTO.naProgramu = mapper.Map<List<FilmoviDTO>>(naProgramu);
           

            return pocetnaDTO;
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<FilmoviDTO>> Get(int id)
        {
            var film = await context.Filmovi
                .Include(x => x.FilmoviZanr).ThenInclude(x => x.Zanr)
                .Include(x=>x.FilmoviSala).ThenInclude(x=>x.Sala).FirstOrDefaultAsync(x => x.Id == id);

            if (film == null)   
                return NotFound();

            var prosjecnaOcjena = 0.0;
            var korisnickaOcjena = 0.0;
            if(await context.OcjenaFilma.AnyAsync(x => x.FilmoviId == id))
            {
                prosjecnaOcjena = await context.OcjenaFilma.Where(x => x.FilmoviId == id).AverageAsync(x => x.Ocjena);

                if (HttpContext.User.Identity.IsAuthenticated)
                {
                    var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
                    var korisnik = await userManager.FindByEmailAsync(email);
                    var korisnikId = korisnik.Id;

                    var ocjenaDb = await context.OcjenaFilma.FirstOrDefaultAsync(x => x.FilmoviId == id && x.KorisnikId == korisnikId);

                    if (ocjenaDb != null)
                    {
                        korisnickaOcjena = ocjenaDb.Ocjena;
                    }
                }
            }

            var dto = mapper.Map<FilmoviDTO>(film);
            dto.prosjecnaOcjena = prosjecnaOcjena;
            dto.korisnickaOcjena = korisnickaOcjena;
            return dto;
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post([FromForm] FilmoviCreationDTO filmoviCreationDTO)
        {
            var film = mapper.Map<Filmovi>(filmoviCreationDTO);

            if (filmoviCreationDTO.Poster != null)
            {
                film.Poster = await fileStorageService.SaveFile(container, filmoviCreationDTO.Poster);
            }
            context.Add(film);
            await context.SaveChangesAsync();
            return film.Id;

        }

        [HttpGet("update/{id}")]
        public async Task<ActionResult<FilmoviPutGetDTO>> PutGet(int id)
        {
            var filmoviActionResult = await Get(id);
            if (filmoviActionResult.Result is NotFoundResult) { return NotFound(); }

            var film = filmoviActionResult.Value;

            var zanrSelectedId = film.zanr.Select(x => x.Id).ToList();
            var nonSelectedZanr = await context.Zanr.Where(x => !zanrSelectedId.Contains(x.Id)).ToListAsync();

            var nonSelectedZanrDTO = mapper.Map<List<ZanrDTO>>(nonSelectedZanr);

            var salaSelectedId = film.sala.Select(x => x.id).ToList();
            var nonSelectedSala = await context.Sala.Where(x => !salaSelectedId.Contains(x.id)).ToListAsync();

            var nonSelectedSalaDTO = mapper.Map<List<SalaDTO>>(nonSelectedSala);

            var response = new FilmoviPutGetDTO();
            response.filmovi = film;
            response.selectedZanr = film.zanr;
            response.nonSelectedZanr = nonSelectedZanrDTO;
            response.selectedSala = film.sala;
            response.nonSelectedSala = nonSelectedSalaDTO;

            return response;
        }
        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromForm] FilmoviCreationDTO filmoviCreationDTO)
        {
            var film = await context.Filmovi.Include(x => x.FilmoviZanr)
                .Include(x=>x.FilmoviSala).FirstOrDefaultAsync(x => x.Id == id);

            if (film == null)
            {
                return NotFound();
            }

            film = mapper.Map(filmoviCreationDTO, film);

            if (filmoviCreationDTO.Poster != null)
            {
                film.Poster = await fileStorageService.EditFile(container, filmoviCreationDTO.Poster, film.Poster);
            }

            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("filter")]
        [AllowAnonymous]
        public async Task<ActionResult<List<FilmoviDTO>>> Filter([FromQuery] FilmoviFilterDTO filmoviFilterDTO)
        {
            var filmoviQueryable = context.Filmovi.AsQueryable();

            if (!string.IsNullOrEmpty(filmoviFilterDTO.naziv))
            {
                filmoviQueryable = filmoviQueryable.Where(x => x.Naslov.Contains(filmoviFilterDTO.naziv));
            }

            if (filmoviFilterDTO.ZanrId != 0)
            {
                filmoviQueryable = filmoviQueryable.Where(x => x.FilmoviZanr.Select(y => y.ZanrId).Contains(filmoviFilterDTO.ZanrId));
            }

            if (!string.IsNullOrEmpty(filmoviFilterDTO.datum))
            {
                var d = DateTime.Parse(filmoviFilterDTO.datum);
                filmoviQueryable = filmoviQueryable.Where(x => x.Datum == d);
            }


            var film = await filmoviQueryable.OrderBy(x => x.Naslov).ToListAsync();
            return mapper.Map<List<FilmoviDTO>>(film);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var film = await context.Filmovi.FirstOrDefaultAsync(x => x.Id == id);
            if (film == null)
            {
                return NotFound();
            }

            context.Remove(film);
            await context.SaveChangesAsync();
            await fileStorageService.DeleteFile(film.Poster, container);
            return NoContent();
        }
    }
}
