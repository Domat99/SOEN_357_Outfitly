import React, {useState} from 'react';
import './OutfitPlanner.css';

const OutfitPlanner = ({closetItems}) => {
    const [outfit, setOutfit] = useState(null);
    const [occasion, setOccasion] = useState('Casual');
    const [savedOutfits, setSavedOutfits] = useState([]);

    const getRandomItem = (category) => {
        const items = closetItems[category];
        if (!items || items.length === 0) return null;

        const matchingItems = items.filter(item => item.tags?.includes(occasion));
        const unworn = matchingItems.filter(item => item.status !== 'Worn Recently');
        const pool = unworn.length ? unworn : matchingItems;

        return pool.length > 0
            ? pool[Math.floor(Math.random() * pool.length)]
            : null;
    };

    const handleGenerateOutfit = () => {
        const top = getRandomItem('Shirts') || getRandomItem('Dresses');
        const layer = getRandomItem('Layers');
        const bottom = getRandomItem('Pants');
        const shoes = getRandomItem('Shoes');
        const accessory = getRandomItem('Accessories');

        setOutfit({
            occasion,
            top: top?.name,
            topImage: top?.image,
            layer: layer?.name,
            layerImage: layer?.image,
            bottom: bottom?.name,
            bottomImage: bottom?.image,
            shoes: shoes?.name,
            shoesImage: shoes?.image,
            accessory: accessory?.name,
            accessoryImage: accessory?.image,
        });

    };

    const handleSaveOutfit = () => {
        if (outfit) {
            const isDuplicate = savedOutfits.some(saved =>
                JSON.stringify(saved) === JSON.stringify(outfit)
            );
            if (!isDuplicate) {
                setSavedOutfits(prev => [outfit, ...prev]);
            }
        }
    };

    const handleDeleteOutfit = (indexToDelete) => {
        setSavedOutfits(savedOutfits.filter((_, index) => index !== indexToDelete));
    };


    return (
        <div className="planner-page">
            <div className="planner-header">
                <h1 className="planner-title">Outfit Planner</h1>
                <p className="planner-subtitle">
                    Let Outfitly suggest the perfect outfit based on your closet and today's needs.
                </p>
                <div className="occasion-selector">
                    <label htmlFor="occasion">Occasion:</label>
                    <select id="occasion" value={occasion} onChange={(e) => setOccasion(e.target.value)}>
                        <option value="Casual">Casual</option>
                        <option value="Work">Work</option>
                        <option value="Formal">Formal</option>
                        <option value="Party">Party</option>
                        <option value="Travel">Travel</option>
                        <option value="Sport">Sport</option>
                    </select>
                </div>
                <button className="btn-generate" onClick={handleGenerateOutfit}>
                    Generate Outfit
                </button>
            </div>

            {outfit && (
                <div className="outfit-card">
                    <h2>Today's Look <span style={{fontWeight: 400, fontSize: '1rem'}}>({outfit.occasion})</span></h2>
                    <div className="outfit-images">
                        {outfit.layerImage && (
                            <div><img src={outfit.layerImage} alt="Layer"/><p>{outfit.layer}</p></div>
                        )}
                        {outfit.topImage && (
                            <div><img src={outfit.topImage} alt="Top"/><p>{outfit.top}</p></div>
                        )}
                        {outfit.bottomImage && (
                            <div><img src={outfit.bottomImage} alt="Bottom"/><p>{outfit.bottom}</p></div>
                        )}
                        {outfit.shoesImage && (
                            <div><img src={outfit.shoesImage} alt="Shoes"/><p>{outfit.shoes}</p></div>
                        )}
                        {outfit.accessoryImage && (
                            <div><img src={outfit.accessoryImage} alt="Accessory"/><p>{outfit.accessory}</p></div>
                        )}
                    </div>
                    <div className="outfit-actions">
                        <button className="btn-try" onClick={handleGenerateOutfit}>Try Again</button>
                        <button className="btn-save" onClick={handleSaveOutfit}>Save Outfit</button>
                    </div>
                </div>
            )}

            {savedOutfits.length > 0 && (
                <div className="saved-outfits">
                    <h3>Saved Outfits</h3>
                    {savedOutfits.map((saved, index) => (
                        <div key={index} className="saved-outfit">
                            <div className="outfit-images">
                                {saved.layerImage &&
                                    <div><img src={saved.layerImage} alt="Layer"/><p>{saved.layer}</p></div>}
                                {saved.topImage && <div><img src={saved.topImage} alt="Top"/><p>{saved.top}</p></div>}
                                {saved.bottomImage &&
                                    <div><img src={saved.bottomImage} alt="Bottom"/><p>{saved.bottom}</p></div>}
                                {saved.shoesImage &&
                                    <div><img src={saved.shoesImage} alt="Shoes"/><p>{saved.shoes}</p></div>}
                                {saved.accessoryImage &&
                                    <div><img src={saved.accessoryImage} alt="Accessory"/><p>{saved.accessory}</p>
                                    </div>}
                            </div>
                            <button onClick={() => handleDeleteOutfit(index)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OutfitPlanner;
