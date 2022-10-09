using Amazon.Runtime.Internal.Auth;
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
using System.Runtime.InteropServices.WindowsRuntime;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;
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
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IOptions<EmailOptionsDTO> emailOptions;
        private readonly IEmail email;

        public AccountsController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager,
            IConfiguration configuration, ApplicationDbContext context, IMapper mapper, RoleManager<IdentityRole> roleManager,
            IOptions<EmailOptionsDTO> emailOptions, IEmail email)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.configuration = configuration;
            this.context = context;
            this.mapper = mapper;
            this.roleManager = roleManager;
            this.emailOptions = emailOptions;
            this.email = email;
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

       

        [HttpPost("dodajUlogu")]
        public async Task<IActionResult> DodajUlogu(Uloga uloga)
        {
            var ulogapostoji = await roleManager.RoleExistsAsync(uloga.Naziv);
            if (!ulogapostoji)
            {
                var result = await roleManager.CreateAsync(new IdentityRole(uloga.Naziv));
            }

            return Ok();
        }

        [HttpPost("create")]
        public async Task<ActionResult<AuthenticationResponse>> Create([FromBody] KorisnickiPodaci podaci)
        {
            var korisnik = new IdentityUser { UserName = podaci.Email, Email = podaci.Email };
            var result = await userManager.CreateAsync(korisnik, podaci.Lozinka);

            if (result.Succeeded)
            {
                //SLANJE EMAILA

                var token = await userManager.GenerateEmailConfirmationTokenAsync(korisnik);
                var confirmEmailUrl = Request.Headers["confirmEmailUrl"];

                var uriBuilder = new UriBuilder(confirmEmailUrl);
                var query = HttpUtility.ParseQueryString(uriBuilder.Query);
                query["token"] = token;
                query["userid"] = korisnik.Id;
                uriBuilder.Query = query.ToString();
                var urlString = uriBuilder.ToString();

                var emailBody = $"Molimo Vas potvrdite vas email klikom na sljedeci link </br>{urlString}";
                var naslov = "Potvrda Emaila";
                await email.Send(podaci.Email, naslov, emailBody, emailOptions.Value);

                ////////////

                await userManager.AddClaimAsync(korisnik, new Claim("role", "user"));
                await NapraviTokenAsync(podaci);

            }

            else
            {
                return BadRequest(result.Errors);
            }

            return Ok(podaci);


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

        [HttpPost("confirmemail")]
        public async Task<IActionResult> ConfirmEmail(ConfirmEmailDTO model)
        {
            var korisnik = await userManager.FindByIdAsync(model.UserId);
            var potvrda = await userManager.ConfirmEmailAsync(korisnik, Uri.UnescapeDataString(model.Token));

            if (potvrda.Succeeded)
            {
                return Ok();
            }

            return Unauthorized();

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

        [HttpPost("resetpassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordDTO model)
        {
            var korisnik = await userManager.FindByEmailAsync(model.Email);
            if (korisnik != null || korisnik.EmailConfirmed)
            {
                //SLANJE EMAILA

                var token = await userManager.GeneratePasswordResetTokenAsync(korisnik);
                var changepasswordUrl = Request.Headers["changepasswordUrl"];

                var uriBuilder = new UriBuilder(changepasswordUrl);
                var query = HttpUtility.ParseQueryString(uriBuilder.Query);
                query["token"] = token;
                query["userid"] = korisnik.Id;
                uriBuilder.Query = query.ToString();
                var urlString = uriBuilder.ToString();

                var emailBody = $"Klikom na link pormijenite Vasu lozinku </br>{urlString}";
                var naslov = "Promijena lozinke";
                await email.Send(model.Email, naslov, emailBody, emailOptions.Value);

                ////////////
                
                return Ok();
            }

            return Unauthorized();
        }

        [HttpPost("changepassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordDTO model)
        {
            var korisnik = await userManager.FindByIdAsync(model.UserId);
            var resetPassword = await userManager.ResetPasswordAsync(korisnik, Uri.UnescapeDataString(model.Token), model.Password);

            if (resetPassword.Succeeded)
            {
                return Ok();
            }

            return Unauthorized();
        }
    }
}
