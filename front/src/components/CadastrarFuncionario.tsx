import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loja } from "../interfaces/Loja";
import { Funcionario } from "../interfaces/Funcionario";

function CadastrarFuncionario() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [lojaId, setLojaId] = useState("");
  const [lojas, setLojas] = useState<Loja[]>([]);

  useEffect(() => {
    carregarLojas();
  }, []);

  function carregarLojas() {
    fetch("http://localhost:5000/loja/listar")
      .then((resposta) => resposta.json())
      .then((lojas: Loja[]) => {
        setLojas(lojas);
      });
  }

  function cadastrarFuncionario(e: any) {
    const funcionario: Funcionario = {
        nome: nome,
        lojaId: lojaId,
    };

    fetch("http://localhost:5000/funcionario/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(funcionario),
    })
      .then((resposta) => resposta.json())
      .then((tarefa: Funcionario) => {
        navigate("/pages/funcionario/listar");
      });
    e.preventDefault();
  }

  return (
    <div>
      <h1>Cadastrar Funcionario</h1>
      <form onSubmit={cadastrarFuncionario}>
        <label>Nome:</label>
        <input
          type="text"
          placeholder="Digite o nome"
          onChange={(e: any) => setNome(e.target.value)}
          required
        />
        <br />
        <br />
        <label>Lojas:</label>
        <select onChange={(e: any) => setLojaId(e.target.value)}>
          {lojas.map((loja) => (
            <option
              value={loja.lojaId}
              key={loja.lojaId}
            >
              {loja.lojaId}
            </option>
          ))}
        </select>
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastrarFuncionario;