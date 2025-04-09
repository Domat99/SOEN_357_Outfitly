import React, { useState } from 'react';
import './OutfitPlanner.css';

const OutfitPlanner = () => {
    const [outfit, setOutfit] = useState(null);

    const handleGenerateOutfit = () => {
        // Hardcoded example — simulate AI logic
        const suggestions = [
            {
                top: "Beige Oversized Sweater",
                bottom: "Black Slim-Fit Jeans",
                shoes: "White Sneakers",
                accessories: "Gold Hoop Earrings",
            },
            {
                top: "Denim Jacket",
                bottom: "White Tee & Olive Cargo Pants",
                shoes: "Chunky Boots",
                accessories: "Minimalist Watch",
            },
            {
                top: "Grey Knit Turtleneck",
                bottom: "Dark Blue Wide-Leg Pants",
                shoes: "Chelsea Boots",
                accessories: "Leather Tote Bag",
            },
        ];
        const randomIndex = Math.floor(Math.random() * suggestions.length);
        setOutfit(suggestions[randomIndex]);
    };

    return (
        <div className="planner-page">
            <div className="planner-header">
                <h1 className="planner-title">Outfit Planner</h1>
                <p className="planner-subtitle">
                    Let Outfitly suggest the perfect outfit based on your style, body type, and today’s weather.
                </p>
                <button className="btn-primary" onClick={handleGenerateOutfit}>
                    Generate Outfit
                </button>
            </div>

            {outfit && (
                <div className="outfit-card">
                    <h2>Today's Look</h2>
                    <ul>
                        <li><strong>Top:</strong> {outfit.top}</li>
                        <li><strong>Bottom:</strong> {outfit.bottom}</li>
                        <li><strong>Shoes:</strong> {outfit.shoes}</li>
                        <li><strong>Accessories:</strong> {outfit.accessories}</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default OutfitPlanner;
