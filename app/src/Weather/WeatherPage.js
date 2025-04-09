import React, { useState } from 'react';
import './WeatherPage.css';

const mockWeather = {
    temperature: 18,
    condition: 'Partly Cloudy',
    humidity: 60,
    wind: '15 km/h',
};

const tips = {
    'Sunny': "Wear light fabrics and sunglasses!",
    'Partly Cloudy': "Layer up — it might cool down later.",
    'Rainy': "Don’t forget a waterproof jacket and boots.",
    'Snowy': "Bundle up with warm layers and gloves.",
    'Windy': "Opt for a windbreaker and avoid flowy outfits.",
};

const WeatherPage = () => {
    const [weather, setWeather] = useState(mockWeather);

    return (
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
    );
};

export default WeatherPage;
