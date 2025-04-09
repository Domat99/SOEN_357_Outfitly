import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Homepage/HomePage';
import Navbar from './Navbar/Navbar';

function App() {
    console.log("Rendering App.js..."); // Debug
    return (
        <Router>
            <Navbar isLoggedIn={false} />
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Router>
    );
}

export default App;
