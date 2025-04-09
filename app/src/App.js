import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Homepage/HomePage';
import Navbar from './Navbar/Navbar';
import Closet from './Closet/Closet';

function App() {
    console.log("Rendering App.js...");
    return (
        <Router>
            <Navbar isLoggedIn={false} />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/closet" element={<Closet />} />
            </Routes>
        </Router>
    );
}

export default App;
