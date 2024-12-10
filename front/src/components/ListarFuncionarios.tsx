import React, { useEffect, useState } from 'react';
import { Funcionario } from '../interfaces/Funcionario';
import { Loja } from '../interfaces/Loja';

function ListarFuncionarios(){
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
    const [lojas, setLojas] = useState<Loja[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/funcionarios/listar')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.statusText);
                }

                return response.json();
            })
            .then(data => {
                setFuncionarios(data);
            })
            .catch(error => {
                console.error('Erro:', error);
            });

            fetch('http://localhost:5000/loja/listar') 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.statusText);
                }

                return response.json();
            })
            .then(data => {
                setLojas(data);
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    }, []);


    function getNomeLoja(id: string):string{
        var nome = "";
        
        lojas.map(
            loja => {
                if(loja.lojaId == id){
                    nome = loja.lojaId;
                }
            }
        );

        return nome;
    }

    
    function deletarTarefa(id: string){
        fetch(`http://localhost:5000/funcionario/deletar/${id}`,  {method: 'DELETE'})
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
               setFuncionarios(data);
            })
            .catch(error => {
                console.error('Erro:', error);
            });

        return id;
    }


    function lista(){
        if(funcionarios.length > 0){
            return(
                funcionarios.map(t => (
                    <tr key={t.funcionarioId}>
                        <td>{t.nome}</td>
                        <td>{t.lojaId}</td>
                    </tr>
                ))
            );
        }else{
            return(
                <tr>
                    <td colSpan={6}>Nenhum funcionario encontrado</td>
                </tr>
            );
        }
        
    }

    return (
        <div>
            <h1>Lista de Funcionairos</h1>
            <table border={1}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>FuncionarioId</th>
                        <th>Criado em</th>
                    </tr>
                </thead>
                <tbody>
                    {lista()}
                </tbody>
            </table>
        </div>
    );
}

export default ListarFuncionarios;