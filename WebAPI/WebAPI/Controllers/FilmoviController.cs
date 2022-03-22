using AutoMapper;
using Microsoft.AspNetCore.Http;
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
    public class FilmoviController : ControllerBase
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        private string container = "filmovi";

        public FilmoviController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("PostGet")]
        public async Task<ActionResult<FilmoviPostGetDTO>> PostGet()
        {
            var zanr = await context.Zanr.ToListAsync();

            var zanrDTO = mapper.Map<List<ZanrDTO>>(zanr);

            return new FilmoviPostGetDTO() { Zanr = zanrDTO };
        }
    }
}
