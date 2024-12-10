using API.models;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total",
        configs => configs
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod())
);

var app = builder.Build();

app.MapGet("/", () => "Gerenciamento de Funcionarios");

app.MapGet("/funcionario/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Funcionarios.Any())
    {
        return Results.Ok(ctx.Funcionarios.ToList());
    }
    return Results.NotFound("Nenhum funcionario encontrado");
});

app.MapPost("/funcionario/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Funcionario funcionario) =>
{
    ctx.Funcionarios.Add(funcionario);
    ctx.SaveChanges();
    return Results.Created("", funcionario);
});

app.MapDelete("/funcionario/deletar/{id}", ([FromServices] AppDataContext ctx, [FromRoute] string id)=>{

    Funcionario? funcionario = ctx.Funcionarios.Find(id);

    if(funcionario is null){
        return Results.NotFound("Funcionario não encontrado!");
    }

    ctx.Funcionarios.Remove(funcionario);
    ctx.SaveChanges();

    return Results.Ok(ctx.Funcionarios.ToList());
});

app.MapPut("/funcionario/alterar/{id}", async ([FromRoute] int id, [FromBody] Funcionario funcionarioAlterado, [FromServices] AppDataContext ctx) => 
{
    Funcionario? funcionario = await ctx.Funcionarios.FindAsync(id);
    if (funcionario is null)
    {
        return Results.NotFound();
    }

    funcionario.Nome = funcionarioAlterado.Nome;

    if (funcionarioAlterado.LojaId > 0)
    {
        funcionario.LojaId = funcionarioAlterado.LojaId;
    }
 
    await ctx.SaveChangesAsync();
    return Results.Ok(funcionario);
});

app.MapGet("/funcionario/buscar/{id}", async ([FromRoute] int id, [FromServices] AppDataContext ctx) => 
{
    Funcionario? funcionario = await ctx.Funcionarios.FindAsync(id);
    if (funcionario is null)
    {
        return Results.NotFound("Funcionario nao encontrado!");
    }
    return Results.Ok(funcionario);
});

app.MapGet("/loja/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Lojas.Any())
    {
        return Results.Ok(ctx.Lojas.ToList());
    }
    return Results.NotFound("Nenhuma loja encontrada");
});

app.MapPost("/loja/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Loja loja) =>
{
    ctx.Lojas.Add(loja);
    ctx.SaveChanges();
    return Results.Created("", loja);
});

app.MapDelete("/loja/deletar/{id}", ([FromServices] AppDataContext ctx, [FromRoute] string id)=>{

    Loja? loja = ctx.Lojas.Find(id);

    if(loja is null){
        return Results.NotFound("Loja não encontrada!");
    }

    ctx.Lojas.Remove(loja);
    ctx.SaveChanges();

    return Results.Ok(ctx.Lojas.ToList());
});

app.MapGet("/loja/buscar/{id}", async ([FromRoute] int id, [FromServices] AppDataContext ctx) => 
{
    Loja? loja = await ctx.Lojas.FindAsync(id);
    if (loja is null)
    {
        return Results.NotFound();
    }
    return Results.Ok(loja);
});

app.UseCors("Acesso Total");
app.Run();
