import React, { useState, useEffect } from 'react';
import AgendasService from "../../../services/agendas.service";
import { Link } from 'react-router-dom';

const AgendasList = () => {
    const [agendas, setAgendas] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const data = await AgendasService.getAll();
            setAgendas(data.data);
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

                    <Link to={"/agenda"} className="btn btn-success px-4 mx-2">
                        Registar
                    </Link>
                </div>
            </section>

            <section>
                <table className="table table-dark table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Dia</th>
                            <th scope="col">Mês</th>
                            <th scope="col">Ano</th>
                            <th scope="col">Dia da semana</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>

                    <tbody>
                        {agendas.map((agenda, index) => (
                            <tr key={agenda.id}>
                                <td >{index + 1}</td>
                                <td>{agenda.dia}</td>
                                <td>{agenda.mes}</td>
                                <td>{agenda.ano}</td>
                                <td>{agenda.diasemana}</td>
                                <td>
                                    <div className="d-flex justify-content">
                                        <Link to={`/agenda/${agenda.id}`} className='btn btn-primary me-2'>Editar</Link>
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

export default AgendasList;