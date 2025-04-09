import React from 'react';
import './LoginPage.css';

const LoginPage = () => {
    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login submitted');
        // Add your hardcoded auth logic here later
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
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
