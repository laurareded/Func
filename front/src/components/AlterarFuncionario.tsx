import React, { useEffect, useState } from 'react';
import { Loja } from '../interfaces/Loja';
import { useNavigate } from 'react-router-dom';

function AlterarFuncionario() {
    const navigate = useNavigate();
    const [id, setId] = useState<string>('');
    const [nome, setNome] = useState<string>('');
    const [LojaId, setLojaId] = useState<string>('');
    const [lojas, setlojas] = useState<Loja[]>([]);

    useEffect(() => {
        carregarLojas();
        carregarFuncionario();
    }, []);

    function carregarLojas() {
        fetch("http://localhost:5000/loja/listar")
            .then((resposta) => resposta.json())
            .then((lojas: Loja[]) => {
                setlojas(lojas);
            }).catch(error => {
                console.error('Erro:', error);
            });
    }

    function carregarFuncionario() {
        const funcionarioId = new URLSearchParams(window.location.search).get("id");
        if (funcionarioId) {
            fetch(`http://localhost:5000/funcionario/${funcionarioId}`)
                .then(res => res.json())
                .then(funcionario => {
                    setId(funcionario.id);
                    setNome(funcionario.nome);
                    setLojaId(funcionario.lojaId);
                })
                .catch(error => {
                    console.error('Erro ao carregar:', error);
                });
        }
    }

    function handleSubmit(e: any) {
        e.preventDefault();

        const FuncionarioAtualizado = {
            id,
            LojaId
        };

        fetch(`http://localhost:5000/funcionario/alterar/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(FuncionarioAtualizado)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                navigate("/pages/funcionario/listar");
            })
            .catch(error => {
                console.error('Erro:', error);
            });
    };

    return (
        <div>
            <h2>Alterar Funcionario</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nome:
                    <input type="text" value={nome} onChange={e => setNome(e.target.value)} required />
                </label>
                <label>Lojas:
                    <select value={LojaId} onChange={e => setLojaId(e.target.value)} required>
                        <option>Selecione...</option>
                        {lojas.map((loja) => (
                            <option value={loja.lojaId} key={loja.lojaId}>
                                {loja.lojaId}
                            </option>
                        ))}
                    </select>
                </label>
                <button type="submit">Alterar</button>
            </form>
        </div>
    );
}

export default AlterarFuncionario;