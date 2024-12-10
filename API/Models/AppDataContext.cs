using API.models;
using Microsoft.EntityFrameworkCore;

namespace API.Models;

    public class AppDataContext : DbContext
{
    public required DbSet<Funcionario> Funcionarios { get; set; }
    public required DbSet<Loja> Lojas { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlite("Data Source=Laurareded.db");
    }

}






