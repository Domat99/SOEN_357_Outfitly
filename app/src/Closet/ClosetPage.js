import React from 'react';
import './ClosetPage.css';

const closetData = {
    Tops: ['White T-Shirt', 'Beige Sweater', 'Blue Denim Jacket'],
    Bottoms: ['Black Jeans', 'Olive Cargo Pants', 'Navy Shorts'],
    Shoes: ['White Sneakers', 'Chelsea Boots', 'Loafers'],
    Accessories: ['Gold Hoop Earrings', 'Leather Watch', 'Black Beanie']
};

const ClosetPage = () => {
    return (
        <div className="closet-page">
            <div className="closet-header">
                <h1 className="closet-title">Your Closet</h1>
                <p className="closet-subtitle">
                    Browse through your wardrobe and get ready to mix and match with Outfitly.
                </p>
            </div>

            <div className="closet-grid">
                {Object.entries(closetData).map(([category, items]) => (
                    <div className="closet-section" key={category}>
                        <h2>{category}</h2>
                        <ul>
                            {items.map((item, index) => (
                                <li key={index} className="closet-item">
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ClosetPage;
