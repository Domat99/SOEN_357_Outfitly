import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Homepage/HomePage';
import Navbar from './Navbar/Navbar';
import ProfilePage from './Profile/ProfilePage';
import LoginPage from './Login/LoginPage';
import OutfitPlanner from './Planner/OutfitPlanner';
import WeatherPage from './Weather/WeatherPage';


function App() {
    console.log("Rendering App.js..."); // Debug
    return (
        <Router>
            <Navbar isLoggedIn={false} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/planner" element={<OutfitPlanner />} />
                <Route path="/weather" element={<WeatherPage />} />

            </Routes>
        </Router>
    );
}

export default App;
