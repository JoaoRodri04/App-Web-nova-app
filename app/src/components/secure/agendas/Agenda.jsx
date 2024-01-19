import React, { useState, useRef, useEffect } from 'react';
import { Navigate, useParams, useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link } from "react-router-dom";

import AgendasService from "../../../services/agendas.service";

const Agenda = () => {
    const navigate = useNavigate();


    const params = useParams();
    const [id, setId] = useState(null);
    const [dia, setDia] = useState("");
    const [mes, setMes] = useState("");
    const [ano, setAno] = useState("");
    const [diasemana, setDiaSemana] = useState("");
    const [successful, setSuccessful] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!params.id) {
            return;
        }

        async function fetchData() {
            const response = await AgendasService.getById(params.id);

            setId(response.data.id);
            setDia(response.data.dia);
            setMes(response.data.mes);
            setAno(response.data.ano);
            setDiaSemana(response.data.diasemana);
        }

        fetchData();
    }, []);


    const form = useRef();
    const checkBtn = useRef();

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            AgendasService.createORupdate(id, dia, mes, ano, diasemana).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);

                    setId(response.data.id);
                    setDia(response.data.dia);
                    setMes(response.data.mes);
                    setAno(response.data.ano);
                    setDiaSemana(response.data.diasemana);
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
        }
    };

    const handleDelete = (e) => {
        e.preventDefault();

        AgendasService.deleteUser(id).then(
            (response) => {
                navigate('/agendas-list');
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setMessage(resMessage);
                setSuccessful(false);
            }
        );
    }

    const required = (value) => {
        if (!value) {
            return (
                <div className="invalid-feedback d-block">
                    É obrigatório!
                </div>
            );
        }
    };

    const validLength = (value) => {
        if (value.length < 3 || value.length > 50) {
            return (
                <div className="invalid-feedback d-block">
                    O nome deve ter entre 3 e 20 caracteres!
                </div>
            );
        }
    };

    return (
        <main>
            <section>
                <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                    <div className="container-fluid py-5">
                        <Form onSubmit={handleRegister} ref={form} className="col-4">
                            <div>
                                <h1 className="h3 mb-3 fw-normal">Registar</h1>

                                <div className="form-group">
                                    <label>Dia</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="dia"
                                        value={dia}
                                        onChange= {(e) => setDia(e.target.value)}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Mês</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="nome"
                                        value={mes}
                                        onChange={(e) => setMes(e.target.value)}
                                        validations={[required, validLength]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Ano</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="Ano"
                                        value={ano}
                                        onChange={(e) => setAno(e.target.value)}
                                        validations={[required, validLength]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Dia da Semana</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="dia da semana"
                                        value={diasemana}
                                        onChange={(e) => setDiaSemana(e.target.value)}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-success mt-2">Registar</button>

                                    {id && (<button onClick={handleDelete} className="btn btn-danger mt-2 mx-2">
                                        Eliminar
                                    </button>)}

                                    <Link to={"/agendas-list"} className="btn btn-secondary mt-2 mx-2">
                                        Voltar
                                    </Link>
                                </div>
                            </div>

                            {successful && (
                                <div className="alert alert-success mt-2" role="alert">
                                    Gravado com sucesso!
                                </div>
                            )}


                            {message && successful !== null && (
                                <div className="form-group">
                                    <div
                                        className={
                                            successful ? "alert alert-success" : "alert alert-danger"
                                        }
                                        role="alert"
                                    >
                                        {message}
                                    </div>
                                </div>
                            )}
                            <CheckButton style={{ display: "none" }} ref={checkBtn} />
                        </Form>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Agenda;