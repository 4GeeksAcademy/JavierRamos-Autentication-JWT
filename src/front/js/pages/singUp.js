import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "../../styles/signUp.css";
import { Context } from "../store/appContext";

export const SignUp = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); // Usa useNavigate para redirigir después del registro
    const [dataForm, setDataForm] = useState({
        email: '',
        password: '',
    });
    const [visible, setVisible] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataForm({ ...dataForm, [name]: value });
    }

    const handleClick = (e) => {
        e.preventDefault();
        setVisible(!visible);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.register(dataForm);
        if (success) {
            navigate('/login'); // Redirige a la página de inicio de sesión después de un registro exitoso
        } else {
            console.log("Error en el registro");
        }
        setDataForm({
            email: '',
            password: ''
        });
    };

    return (
        <div>
            <form className="container d-flex flex-column align-items-center mt-5 p-3" id="formularioRegistro" onSubmit={handleSubmit}>
                <h4 className="mt-2 mb-4"><b>Página de registro</b></h4>
                <label>Email
                    <input className="form-control" name="email" value={dataForm.email} placeholder="Correo electrónico" onChange={handleChange} type="text" />
                </label>
                <label>Contraseña
                    <div className="contenedor-password2">
                        <input className="form-control" name="password" value={dataForm.password} placeholder="Contraseña" onChange={handleChange} type={visible ? "text" : "password"} />
                    </div>
                </label>
                <input className="btn btn-secondary mt-3" value="Regístrate" type="submit" />
            </form>
        </div>
    );
};