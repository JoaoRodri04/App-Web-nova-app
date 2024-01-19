import React, { useState, useRef, useEffect } from 'react';
import { Navigate, useParams, useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link } from "react-router-dom";

import ReceitasService from "../../../services/receitas.service";

const Receita = () => {
    const navigate = useNavigate();


    const params = useParams();
    const [id, setId] = useState(null);
    const [nome, setNome] = useState("");
    const [tempo, setTempo] = useState("");
    const [graus, setGraus] = useState("");
    const [successful, setSuccessful] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!params.id) {
            return;
        }

        async function fetchData() {
            const response = await ReceitasService.getById(params.id);

            setId(response.data.id);
            setNome(response.data.nome);
            setTempo(response.data.tempo);
            setGraus(response.data.graus);
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
            ReceitasService.createORupdate(id, nome, tempo, graus).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);

                    setId(response.data.id);
                    setNome(response.data.nome);
                    setTempo(response.data.tempo);
                    setGraus(response.data.graus);
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

        ReceitasService.deleteUser(id).then(
            (response) => {
                navigate('/receitas-list');
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
                                    <label>Nome</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="nome"
                                        value={nome}
                                        onChange= {(e) => setNome(e.target.value)}
                                        validations={[required]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Tempo</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="tempo"
                                        value={tempo}
                                        onChange={(e) => setTempo(e.target.value)}
                                        validations={[required, validLength]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Graus</label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        name="Graus"
                                        value={graus}
                                        onChange={(e) => setGraus(e.target.value)}
                                        validations={[required, validLength]}
                                    />
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-success mt-2">Registar</button>

                                    {id && (<button onClick={handleDelete} className="btn btn-danger mt-2 mx-2">
                                        Eliminar
                                    </button>)}

                                    <Link to={"/receitas-list"} className="btn btn-secondary mt-2 mx-2">
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

export default Receita;