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
import StudentsList from "./components/secure/students/StudentsList";
import Student from "./components/secure/students/Student";

import Footer from "./components/shared/Footer";
import Header from "./components/shared/Header";
import AgendasList from "./components/secure/agendas/agendasList";
import Agenda from "./components/secure/agendas/Agenda";
import AgendasList from "./components/secure/agendas/agendasList";
import Agenda from "./components/secure/agendas/Agenda";

const App = () => {
return (
    <div>
    <div className="container mt-3">
    <Header /> 
        <Routes>
        <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/students-list" element={<StudentsList />} />
            <Route path="/student" element={<Student />} />
            <Route path="/student/:number" element={<Student />} />
            <Route path="/agendas-list" element={<AgendasList />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="/agenda/:id" element={<Agenda />} />
            <Route path="/categorias-list" element={<CategoriasList />} />
            <Route path="/categoria" element={<Categoria />} />
            <Route path="/categoria/:id" element={<Categoria />} />
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