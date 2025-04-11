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
import ProtectedRoute from './components/ProtectedRoute';



function App() {
    const [closetItems, setClosetItems] = useState({});
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
                <Route
                    path="/closet"
                    element={
                        <ProtectedRoute>
                            <Closet
                                closetItems={closetItems}
                                setClosetItems={setClosetItems}
                                loggedInUser={loggedInUser}
                            />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <ProfilePage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/planner"
                    element={
                        <ProtectedRoute>
                            <OutfitPlanner closetItems={closetItems} />
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<LoginPage setLoggedInUser={setLoggedInUser} />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/weather" element={<WeatherPage />} />
            </Routes>

        </Router>
    );
}

export default App;
