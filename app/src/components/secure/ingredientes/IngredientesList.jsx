import React, { useState, useEffect } from 'react';
import IngredientesService from "../../../services/ingredientes.service";
import { Link } from 'react-router-dom';

const IngredientesList = () => {
    const [ingredientes, setIngredientes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await IngredientesService.getAll();
            setIngredientes(data.data);
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

                    <Link to={"/ingrediente"} className="btn btn-success px-4 mx-2">
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
                            <th scope="col">Quantidade</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {ingredientes.map((ingrediente, index) => (
                            <tr key={ingrediente.id}>
                                <td >{index + 1}</td>
                                <td>{ingrediente.nome}</td>
                                <td>{ingrediente.quantidade}</td>
                                <td>
                                    <div className="d-flex justify-content">
                                        <Link to={`/ingrediente/${ingrediente.id}`} className='btn btn-primary me-2'>Editar</Link>
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

export default IngredientesList;