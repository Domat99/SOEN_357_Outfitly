import React, { useState } from 'react';
import './SignUp.css';
import {Link} from "react-router-dom";


const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];

        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            setError('Account already exists');
            setSuccess('');
            return;
        }

        const newUser = { email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        setSuccess('Account created! You can now log in.');
        setError('');
        setEmail('');
        setPassword('');
    };

    return (
        <div className="signup-page">
            <div className="signup-card">
                <h1 className="signup-title">Create Account</h1>
                <p className="signup-subtitle">Join Outfitly to plan your perfect outfits</p>
                <form className="signup-form" onSubmit={handleSignUp}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="signup-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="signup-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="btn-primary signup-button">Sign Up</button>
                </form>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <p className="signup-subtitle">
                    Already have an account? <Link to="/login">Log in here</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
