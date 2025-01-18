import React, { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'; // Importiere die CSS Datei

const Login: React.FC = () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            navigate('/tournaments');
        }
    }, [navigate]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const username = e.currentTarget.username.value;
        const password = e.currentTarget.password.value;

        try {
            const response = await axios.post('https://kavolley.uber.space/api/login', {
                username,
                password,
            });

            const { accessToken, roleToken } = response.data;
            setAccessToken(accessToken);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('roleToken', roleToken);

            navigate('https://kavolley.uber.space/');
            window.location.reload();
        } catch (error) {
            console.error('Login fehlgeschlagen', error);
        }
    };


    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <input type="text" id="username" placeholder="Email" required />
                <input type="password" id="password" placeholder="Passwort" required />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
