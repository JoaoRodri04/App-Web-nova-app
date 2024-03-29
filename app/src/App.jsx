import React, {  } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import PrivateRoutes from "./utils/privateRoute";
import PublicRoutes from "./utils/publicRoute";

//PUBLIC ROUTES
import Home from "./components/public/Home";
import Login from "./components/public/Login";
import Register from "./components/public/Register";

//PRIVATE ROUTES
import Dashboard from "./components/secure/dashboard";

import Footer from "./components/shared/Footer";
import Header from "./components/shared/Header";
import AgendasList from "./components/secure/agendas/agendasList";
import Agenda from "./components/secure/agendas/Agenda";
import CategoriasList from "./components/secure/categorias/categoriasList";
import Categoria from "./components/secure/categorias/Categoria";
import IngredientesList from "./components/secure/ingredientes/IngredientesList";
import Ingrediente from "./components/secure/ingredientes/Ingrediente";
import ReceitasList from "./components/secure/receitas/ReceitasList";
import Receita from "./components/secure/receitas/Receita";

const App = () => {
return (
    <div>
    <div className="container mt-3">
    <Header /> 
        <Routes>
        <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/agendas-list" element={<AgendasList />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/agenda/:id" element={<Agenda />} />
            <Route path="/categorias-list" element={<CategoriasList />} />
            <Route path="/categoria" element={<Categoria />} />
            <Route path="/categoria/:id" element={<Categoria />} />
            <Route path="/ingredientes-list" element={<IngredientesList />} />
            <Route path="/ingrediente" element={<Ingrediente />} />
            <Route path="/ingrediente/:id" element={<Ingrediente />} />
            <Route path="/receitas-list" element={<ReceitasList />} />
            <Route path="/receita" element={<Receita />} />
            <Route path="/receita/:id" element={<Receita />} />
            <Route path='*'element={<Navigate to="/dashboard" />} />
        </Route>

        <Route element={<PublicRoutes />}>
            <Route exact path={"/"} element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/" />}  />
        </Route>
        </Routes>
        <Footer /> 
    </div>
    </div>
);
};

export default App;