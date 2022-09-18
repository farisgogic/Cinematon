using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebAPI.DTO;
using WebAPI.Helpers;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : Controller
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<IdentityUser> signInManager;
        private readonly IConfiguration configuration;
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;

        public AccountsController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager,
            IConfiguration configuration, ApplicationDbContext context, IMapper mapper)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("listKorisnik")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
        public async Task<ActionResult<List<KorisniciDTO>>> GetListKorisnik([FromQuery] PaginationDTO paginationDTO)
        {
            var queryable = context.Users.AsQueryable();
            await HttpContext.InsertParametersPaginationInHeader(queryable);
            var korisnik = await queryable.OrderBy(x => x.Email).Paginate(paginationDTO).ToListAsync();
            return mapper.Map<List<KorisniciDTO>>(korisnik);

        }

        [HttpPost("dodajAdmin")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
        public async Task<ActionResult> DodajAdmin([FromBody] string korisnikId)
        {
            var korisnik = await userManager.FindByIdAsync(korisnikId);
            await userManager.AddClaimAsync(korisnik, new Claim("role", "admin"));
            return NoContent();
        }


        [HttpPost("izbrisiAdmin")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
        public async Task<ActionResult> IzbrisiAdmin([FromBody] string korisnikId)
        {
            var korisnik = await userManager.FindByIdAsync(korisnikId);
            await userManager.RemoveClaimAsync(korisnik, new Claim("role", "admin"));
            return NoContent();
        }

        

        [HttpPost("create")]
        public async Task<ActionResult<AuthenticationResponse>> Create([FromBody] KorisnickiPodaci podaci)
        {
            var korisnik = new IdentityUser { UserName = podaci.Email, Email = podaci.Email };
            var result = await userManager.CreateAsync(korisnik, podaci.Lozinka);

            if (result.Succeeded)
            {
                return await NapraviTokenAsync(podaci);
            }
            
            else
            {
                return BadRequest(result.Errors);
            }
        }


        [HttpPost("login")]
        public async Task<ActionResult<AuthenticationResponse>> Login([FromBody] KorisnickiPodaci podaci)
        {
            var result = await signInManager.PasswordSignInAsync(podaci.Email, podaci.Lozinka, isPersistent: false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                return await NapraviTokenAsync(podaci);
            }
            else
            {
                return BadRequest("Pogresna prijava");
            }
        
        }

        private async Task<AuthenticationResponse> NapraviTokenAsync(KorisnickiPodaci podaci)
        {
            var claims = new List<Claim>()
            {
                new Claim("email", podaci.Email)
            };

            var korisnik = await userManager.FindByNameAsync(podaci.Email);
            var claimsDB = await userManager.GetClaimsAsync(korisnik);

            claims.AddRange(claimsDB);

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["keyjwt"]));
            var podatak = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var datumIsteka = DateTime.UtcNow.AddYears(1);

            var token = new JwtSecurityToken(issuer: null, audience: null, claims: claims, expires: datumIsteka, signingCredentials: podatak);

            return new AuthenticationResponse()
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                DatumIsteka = datumIsteka
            };
        }
    }
}
