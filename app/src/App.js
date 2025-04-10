import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Homepage/HomePage';
import Navbar from './Navbar/Navbar';
import Closet from './Closet/Closet';
import ProfilePage from './Profile/ProfilePage';
import LoginPage from './Login/LoginPage';
import SignUp from './Login/SignUp';
import OutfitPlanner from './Planner/OutfitPlanner';
import WeatherPage from './Weather/WeatherPage';
import {initialClosetItems} from "./Closet/initialClosetItems";



function App() {
    const [closetItems, setClosetItems] = useState(initialClosetItems);
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (storedUser) {
            setLoggedInUser(storedUser);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('loggedInUser');
        setLoggedInUser(null);
    };

    return (
        <Router>
            <Navbar loggedInUser={loggedInUser} handleLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/closet" element={<Closet closetItems={closetItems} setClosetItems={setClosetItems} />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/login" element={<LoginPage setLoggedInUser={setLoggedInUser} />} />
                <Route path="/Signup" element={<SignUp />} />
                <Route path="/planner" element={<OutfitPlanner closetItems={closetItems} />} />
                <Route path="/weather" element={<WeatherPage />} />
            </Routes>
        </Router>
    );
}

export default App;
