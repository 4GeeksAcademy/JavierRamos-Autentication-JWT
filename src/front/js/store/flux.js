const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			register: async (formData) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + '/api/signup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });

                    const data = await response.json();
                    console.log('Response data:', data);

                    if (response.ok) {
                        return {
                            success: true,
                            message: 'Usuario creado exitosamente.',
                        };
                    } else {
                        return {
                            success: false,
                            message: data.message || 'Error desconocido durante el registro '
                        };
                    }
                } catch (error) {
                    console.error('Error en registerUser:', error);
                    return {
                        success: false,
                        message: 'Error de conexión o servidor no disponible'
                    };
                }
            },

            loginUser: async ({ email, password }) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + '/api/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email, password })
                    });

                    const data = await response.json();
                    console.log('Response data:', data);

                    if (response.ok) {
                        localStorage.setItem("token", data.token)
                        setStore({ user: data.user })
                        return {
                            success: true,
                            user: data.user,
                            data: {
                                token: data.token
                            },
                            message: 'Conexión exitosa con el servidor'
                        };
                    } else {
                        return {
                            success: false,
                            message: data.message || 'Error desconocido'
                        };
                    }
                } catch (error) {
                    console.error('Error en loginUser:', error);
                    return {
                        success: false,
                        message: 'Error de conexión o servidor no disponible'
                    };
                }
            },
			
			logout: () => {
                localStorage.removeItem('token'); // Elimina el token del localStorage
            },
			
		}
	};
};

export default getState;
