import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProtectedRoute.css';
import loginImage from '../assets/images/Outfitly_login.png';

const ProtectedRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem('loggedInUser');
    const navigate = useNavigate();

    if (isLoggedIn) return children;

    return (
        <div className="login-prompt-container">
            <img src={loginImage} alt="Please log in" className="login-prompt-image" />
            <h2>Please log in to access this feature</h2>
            <p>You need to be signed in to use this part of the app.</p>
            <button className="login-button" onClick={() => navigate('/login')}>
                Go to Login
            </button>
        </div>
    );
};

export default ProtectedRoute;
