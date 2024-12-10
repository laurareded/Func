namespace API.models;

public class Funcionario {

    public int FuncionarioId { get; set;}
    public string? Nome { get; set;}
    public DateTime CriadoEm { get; set; } = DateTime.Now;
    public Loja? Loja { get; set;}
    public int LojaId { get; set;}
}