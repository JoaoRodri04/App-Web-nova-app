import React, { useState, useEffect } from 'react';
import CategoriasService from "../../../services/categorias.service";
import { Link } from 'react-router-dom';

const CategoriasList = () => {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await CategoriasService.getAll();
            setCategorias(data.data);
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

                    <Link to={"/categoria"} className="btn btn-success px-4 mx-2">
                        Registar
                    </Link>
                </div>
            </section>

            <section>
                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Descrição</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {categorias.map((categoria, index) => (
                            <tr key={categoria.id}>
                                <td >{index + 1}</td>
                                <td>{categoria.descricao}</td>
                                <td>
                                    <div className="d-flex justify-content">
                                        <Link to={`/categoria/${categoria.id}`} className='btn btn-primary me-2'>Editar</Link>
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

export default CategoriasList;