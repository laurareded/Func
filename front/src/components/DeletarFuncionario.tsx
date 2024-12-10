import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DeletarFuncionario({ funcionarioId }: { funcionarioId: string }) {
    const navigate = useNavigate();

    function handleDelete() {
        if (window.confirm("Deseja realmente excluir este funcionario?")) {
            fetch(`http://localhost:5000/funcionario/deletar/${funcionarioId}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Erro ao excluir: ' + response.statusText);
                    }
                    return response.json();
                })
                .then(() => {
                    alert('Funcionario excluída com sucesso!');
                    navigate("/pages/funcionario/listar");
                })
                .catch(error => {
                    console.error('Erro:', error);
                });
        }
    }

    return (
        <button onClick={handleDelete} style={{ color: 'red' }}>
            Excluir
        </button>
    );
}

export default DeletarFuncionario;