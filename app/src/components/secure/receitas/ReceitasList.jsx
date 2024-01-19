import React, { useState, useEffect } from 'react';
import ReceitasService from "../../../services/receitas.service";
import { Link } from 'react-router-dom';

const ReceitasList = () => {
    const [receitas, setReceitas] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await ReceitasService.getAll();
            setReceitas(data.data);
        }

        fetchData();
    }, []);

    return (
        <main>
            <section className="py-4">
                <div className="d-flex justify-content">
                    <Link to={"/"} className="btn btn-secondary px-4 mx-2">
                        Voltar
                    </Link>

                    <Link to={"/receita"} className="btn btn-success px-4 mx-2">
                        Registar
                    </Link>
                </div>
            </section>

            <section>
                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Tempo</th>
                            <th scope="col">Graus</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {receitas.map((receita, index) => (
                            <tr key={receita.id}>
                                <td >{index + 1}</td>
                                <td>{receita.nome}</td>
                                <td>{receita.tempo}</td>
                                <td>{receita.graus}</td>

                                <td>
                                    <div className="d-flex justify-content">
                                        <Link to={`/receita/${receita.id}`} className='btn btn-primary me-2'>Editar</Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </main>
    );
}

export default ReceitasList;