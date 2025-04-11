import React, { useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        gender: '',
        bodyMetrics: {
            height: '',
            weight: '',
            chest: '',
            waist: '',
            hips: '',
            shoulders: ''
        }
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name in form.bodyMetrics) {
            setForm({
                ...form,
                bodyMetrics: {
                    ...form.bodyMetrics,
                    [name]: value
                }
            });
        } else {
            setForm({
                ...form,
                [name]: value
            });
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/api/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            if (!res.ok) {
                throw new Error('Sign up failed.');
            }

            await res.json();

            // Redirect to home
            navigate('/login');

        } catch (err) {
            setError(err.message);
            setSuccess('');
        }
    };


    return (
        <div className="signup-page">
            <div className="signup-card">
                <h1 className="signup-title">Create Account</h1>
                <p className="signup-subtitle">Join Outfitly to plan your perfect outfits</p>
                <form className="signup-form" onSubmit={handleSignUp}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="signup-input"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="signup-input"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="signup-input"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="gender"
                        className="signup-input"
                        value={form.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>

                    {/* Body metrics */}
                    <input
                        type="number"
                        name="height"
                        placeholder="Height (cm)"
                        className="signup-input"
                        value={form.bodyMetrics.height}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="weight"
                        placeholder="Weight (kg)"
                        className="signup-input"
                        value={form.bodyMetrics.weight}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="chest"
                        placeholder="Chest (cm)"
                        className="signup-input"
                        value={form.bodyMetrics.chest}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="waist"
                        placeholder="Waist (cm)"
                        className="signup-input"
                        value={form.bodyMetrics.waist}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="hips"
                        placeholder="Hips (cm)"
                        className="signup-input"
                        value={form.bodyMetrics.hips}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="shoulders"
                        placeholder="Shoulders (cm)"
                        className="signup-input"
                        value={form.bodyMetrics.shoulders}
                        onChange={handleChange}
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
