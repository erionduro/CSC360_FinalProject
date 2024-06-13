using Microsoft.EntityFrameworkCore;

namespace DBIncidents
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; } // Store hashed passwords
    }
    public class IncidentContext : DbContext
    {
        public int Id {get; set;}
        public DbSet<Incident> Incident { get; set; }
        public DbSet<Header> Header { get; set; }
        public DbSet<RACI> Raci { get; set; }
        public DbSet<Timeline> Timeline { get; set; }
        public DbSet<Documentation> Documentation { get; set; }
        public object Users { get; internal set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=IncidentDB.db");
        }

    }
}