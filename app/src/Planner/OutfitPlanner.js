import React, {useState} from 'react';
import './OutfitPlanner.css';
import Footer from "../Footer/Footer";

const OutfitPlanner = ({}) => {
    const [outfit, setOutfit] = useState(null);
    const [occasion, setOccasion] = useState('Casual');
    const [savedOutfits, setSavedOutfits] = useState([]);

    const handleGenerateOutfit = async () => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!user || !user.id || !user.bodyMetrics) {
            alert('User or body metrics missing');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/outfit/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    styleType: occasion,
                    lat: 45.5019,
                    lon: -73.5674,
                    ...user.bodyMetrics,
                }),
            });

            if (!response.ok) throw new Error('Failed to generate outfit');

            const data = await response.json();

            const formattedOutfit = { occasion };
            data.forEach(item => {
                const type = item.type.toLowerCase();

                if (type === 'shirts' || type === 'dresses') {
                    formattedOutfit.top = item.name;
                    formattedOutfit.topImage = item.link;
                } else if (type === 'layers') {
                    formattedOutfit.layer = item.name;
                    formattedOutfit.layerImage = item.link;
                } else if (type === 'pants') {
                    formattedOutfit.bottom = item.name;
                    formattedOutfit.bottomImage = item.link;
                } else if (type === 'shoes') {
                    formattedOutfit.shoes = item.name;
                    formattedOutfit.shoesImage = item.link;
                } else if (type === 'accessories') {
                    formattedOutfit.accessory = item.name;
                    formattedOutfit.accessoryImage = item.link;
                }
            });
            setOutfit(formattedOutfit);
        } catch (error) {
            console.error(error);
            alert('Error generating outfit');
        }
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
        <div>
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
            <Footer />
        </div>
    );
};

export default OutfitPlanner;
