import React from 'react';
import './LoginPage.css';
import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setLoggedInUser }) => {
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        const emailInput = e.target[0].value;
        const passwordInput = e.target[1].value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === emailInput && u.password === passwordInput);

        if (user) {
            console.log('Login successful');
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            setLoggedInUser(user);
            navigate('/');
        } else {
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
                    <button type="submit" className="btn-primary login-button">Log In</button>
                    <p className="signup-subtitle">
                        Don't have an account? <Link to="/signup">Sign up here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
