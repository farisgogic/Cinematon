using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;
using WebAPI.DTO;
using WebAPI.Entities;
using WebAPI.Filter;
using WebAPI.Helpers;

namespace WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("Default_local")));

            

            services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    var frontendURL = Configuration.GetValue<string>("frontend_url");
                    builder.WithOrigins(frontendURL).AllowAnyMethod().AllowAnyHeader();
                });
            });

            services.AddControllers(options=> {
                options.Filters.Add(typeof(MyExceptionFilter));
            });

            services.AddScoped<IFileStorageService, InAppStorageService>();
            

            services.AddHttpContextAccessor();


            services.AddControllers().ConfigureApiBehaviorOptions(options=>
            {
                options.InvalidModelStateResponseFactory = context =>
                {
                    var errors = context.ModelState.Keys
                                            .SelectMany(key => context.ModelState[key].Errors.Select(x => $"{key}: {x.ErrorMessage}"))
                                            .ToArray();

                    var apiError = new CustomErrorClass()
                    {
                        Message = "Validation Error",
                        Errors = errors
                    };

                    var result = new ObjectResult(apiError);
                    result.ContentTypes.Add(MediaTypeNames.Application.Json);

                    return result;
                };
            });

            services.AddAutoMapper(typeof(Startup));
    
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPI", Version = "v1" });
            });

            services.AddDefaultIdentity<IdentityUser>().AddRoles<IdentityRole>().AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();

            services.AddScoped<IEmail, MailJet>();
            services.Configure<EmailOptionsDTO>(Configuration.GetSection("MailJet"));

            services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequiredUniqueChars = 0;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireDigit = false;
                options.Password.RequireUppercase = false;

                options.User.RequireUniqueEmail = true;
            });

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options=>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["keyjwt"])),
                        ClockSkew=TimeSpan.Zero
                    };
                });

        

            services.AddAuthorization(options =>
            {
                options.AddPolicy("IsAdmin", policy => policy.RequireClaim("role", "admin"));
            });

        }



        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            
        
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPI v1"));
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(x=>x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseAuthorization();

            app.UseAuthentication();

            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

        }
    }
}
