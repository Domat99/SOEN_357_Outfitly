import React, { useState, useEffect } from 'react';
import './WeatherPage.css';
import { fetchWeather, tips } from './weatherAPI';
import Footer from "../Footer/Footer";

const WeatherPage = () => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const getWeather = async () => {
            const latitude = 45.5017;
            const longitude = -73.5673;
            const fetchedWeather = await fetchWeather(latitude, longitude);
            if (fetchedWeather) setWeather(fetchedWeather);
        };

        getWeather();
    }, []);

    if (!weather) {
        return <div className="weather-page">Loading weather data...</div>;
    }

    return (
        <div>
            <div className="weather-page">
                <div className="weather-overlay">
                    <div className="weather-header">
                        <h1 className="weather-title">Today's Weather</h1>
                        <p className="weather-subtitle">
                            Outfitly checks the weather so you don’t have to — here’s what’s happening outside.
                        </p>
                    </div>

                    <div className="weather-card">
                        <h2>{weather.condition}</h2>
                        <p className="temp">{weather.temperature}°C</p>
                        <p><strong>Humidity:</strong> {weather.humidity}%</p>
                        <p><strong>Wind:</strong> {weather.wind}</p>

                        <div className="weather-tip">
                            <h3>What to Wear:</h3>
                            <p>{tips[weather.condition] || "Stay comfortable and dress smart!"}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
};

export default WeatherPage;
