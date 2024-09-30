import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"; // Importa el Contexto desde el store
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const handleLogout = () => {
        actions.logout()
        navigate('/login');
    }
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<div className="navbar-buttons">
                    <Link to="/login" className="btn btn-secondary">
                        Iniciar sesión
                    </Link>
                    <Link to="/" className="btn btn-secondary">
                        Registrarse
                    </Link>
                </div>
				<div className="ml-auto">
					<button className="btn btn-primary" onClick={handleLogout}>Cerrar sesión</button>
				</div>
			</div>
		</nav>
	);
};
