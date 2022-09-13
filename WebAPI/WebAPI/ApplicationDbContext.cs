using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Entities;

namespace WebAPI
{
    public class ApplicationDbContext:IdentityDbContext
    {
        public ApplicationDbContext([NotNullAttribute] DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<FilmoviZanr>().HasKey(x => new { x.FilmoviId, x.ZanrId });

            modelBuilder.Entity<FilmoviSala>().HasKey(x => new { x.SalaId, x.FilmoviId });


            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Zanr> Zanr { get; set; }
        public DbSet<Filmovi> Filmovi{ get; set; }
        public DbSet<FilmoviZanr> FilmoviZanr{ get; set; }
        public DbSet<OcjenaFilma> OcjenaFilma{ get; set; }
        public DbSet<Klupa> Klupa { get; set; }
        public DbSet<Sala> Sala { get; set; }
        public DbSet<FilmoviSala> FilmoviSala { get; set; }



    }
}
