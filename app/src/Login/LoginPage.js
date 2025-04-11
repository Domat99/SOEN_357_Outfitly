import React from 'react';
import './LoginPage.css';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setLoggedInUser }) => {
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const user = await response.json();

            if (user) {
                console.log('Login successful');
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                setLoggedInUser(user);
                navigate('/');
            } else {
                alert('Invalid email or password');
            }
        } catch (err) {
            console.error(err);
            alert('Invalid email or password');
        }
    };


    return (
        <div className="login-page">
            <div className="login-card">
                <h1 className="login-title">Welcome Back</h1>
                <p className="login-subtitle">Log in to your Outfitly account</p>
                <form className="login-form" onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" className="login-input" required />
                    <input type="password" placeholder="Password" className="login-input" required />
                    <button type="submit" className="btn-primary login-button-page">Log In</button>
                    <p className="signup-subtitle">
                        Don't have an account? <Link to="/signup">Sign up here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
