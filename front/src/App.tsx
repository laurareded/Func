import React from 'react';
import { Link, Route } from 'react-router-dom';
import { BrowserRouter, Routes } from 'react-router-dom';
import ListaTarefas from './components/ListarFuncionarios'; 
//import './css/App.css';
import CadastrarTarefa from './components/CadastrarFuncionario';
import AlterarTarefa from './components/AlterarFuncionario'; 
import AlterarFuncionario from './components/AlterarFuncionario';
import CadastrarFuncionario from './components/CadastrarFuncionario';
import ListarFuncionarios from './components/ListarFuncionarios';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="App">
          <nav>
              <ul>
                  <li>
                      <Link to="/pages/funcionario/listar">Lista de Funcionarios</Link>
                  </li>
                  <li>
                      <Link to="/pages/funcionario/cadastrar">Cadastro de Funcionarios</Link>
                  </li>
                  <li>
                    <Link to="/pages/funcionario/alterar/:id">Alterar Funcionarios</Link>
                  </li>
              </ul>
          </nav>
          <Routes>
              <Route path="/pages/funcionario/listar" element={<ListarFuncionarios />} />
              <Route path="/pages/funcionario/cadastrar" element={<CadastrarFuncionario />} />
              <Route path="/pages/funcionario/alterar/:id" element={<AlterarFuncionario />} /> 
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
