import React, { useEffect, useState } from 'react';
import './Closet.css';
import {uploadToCloudinary} from './uploadToCloudinary';
import Footer from "../Footer/Footer";

export default function Closet({ closetItems, setClosetItems }) {
    const [showModal, setShowModal] = useState(false);
    const [newItem, setNewItem] = useState({
        name: '',
        link: '',
        status: '',
        tags: [],
        weather: '',
        size: ''
    });
    const [activeCategory, setActiveCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [activeTag, setActiveTag] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);

    const openModal = (category) => {
        setActiveCategory(category);
        setNewItem({ name: '', image: '', status: '', tags: [] });
        setShowModal(true);
        setErrorMsg('');
    };

    const addItem = async () => {
        if (!newItem.name || !newItem.link) {
            setErrorMsg('Item name and image are required.');
            return;
        }

        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!user || !user.id) {
            setErrorMsg('User not found');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/users/${user.id}/closet`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...newItem, type: activeCategory })
            });

            if (!response.ok) throw new Error('Failed to save item');

            const savedItem = await response.json();
            setClosetItems((prev) => ({
                ...prev,
                [activeCategory]: [...prev[activeCategory], savedItem],
            }));
            setShowModal(false);
        } catch (error) {
            console.error(error);
            setErrorMsg('Error saving item.');
        }
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (user) {
            fetch(`http://localhost:8080/api/closet/closet/${user.id}`)
                .then((res) => res.json())
                .then((data) => {
                    const grouped = {};
                    for (const item of data) {
                        if (!grouped[item.type]) grouped[item.type] = [];
                        grouped[item.type].push(item);
                    }
                    setClosetItems(grouped);
                });
        }
    }, [setClosetItems]);

    if (!closetItems || Object.keys(closetItems).length === 0) {
        return (
            <div className="closet-loading">
                <div className="spinner" />
                <p>Loading your closet...</p>
            </div>
        );
    }

    return (
        <div>
            <div className="closet-page">
                <h2>Your Closet</h2>

            <input
                type="text"
                className="search-bar"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="filter-tags">
                <strong>Filter by Tag:</strong>
                {['All', 'Casual', 'Work', 'Formal', 'Party', 'Travel', 'Sport'].map((tag) => (
                    <button
                        key={tag}
                        className={activeTag === tag ? 'active' : ''}
                        onClick={() => setActiveTag(tag === 'All' ? '' : tag)}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {Object.entries(closetItems).map(([category, items]) => {
                const filteredItems = items
                    .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .filter((item) => (activeTag ? item.tags?.includes(activeTag) : true));

                return (
                    <div key={category} className="category-section">
                        <h3>{category.toUpperCase()} ({filteredItems.length})</h3>
                        <div className="card-grid">
                            {filteredItems.map((item, index) => (
                                <div key={index} className="card" onClick={() => setSelectedItem(item)}>
                                    <img src={item.link} alt={item.name} />
                                    <div className="card-text">
                                        <strong>{item.name}</strong>
                                        <p>{item.status}</p>
                                        <div className="tag-badges">
                                            {item.tags?.map((tag, i) => (
                                                <span key={i} className="tag-badge">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}

                                <div className="card add-card" onClick={() => openModal(category)}>
                                    <div className="plus">+</div>
                                    <p>Add Item</p>
                                </div>
                            </div>
                        </div>
                    );
                })}

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Add New Item to {activeCategory}</h3>
                        <input
                            type="text"
                            placeholder="Item Name"
                            value={newItem.name}
                            onChange={(e) => {
                                setNewItem({ ...newItem, name: e.target.value });
                                setErrorMsg('');
                            }}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const imageUrl = await uploadToCloudinary(file);
                                    if (imageUrl) {
                                        setNewItem({ ...newItem, link: imageUrl });
                                        setErrorMsg('');
                                    } else {
                                        setErrorMsg('Failed to upload image.');
                                    }
                                }
                            }}
                        />
                        {newItem.link && (
                            <img src={newItem.link} alt="Preview" className="modal-preview-img" />
                        )}
                        <input
                            type="text"
                            placeholder="Status (e.g., Worn Recently)"
                            value={newItem.status}
                            onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
                        />
                        <div className="tag-options">
                            {['Casual', 'Work', 'Formal', 'Party', 'Travel', 'Sport'].map((tag) => (
                                <label key={tag}>
                                    <input
                                        type="checkbox"
                                        checked={newItem.tags.includes(tag)}
                                        onChange={(e) => {
                                            const isChecked = e.target.checked;
                                            setNewItem((prev) => ({
                                                ...prev,
                                                tags: isChecked
                                                    ? [...prev.tags, tag]
                                                    : prev.tags.filter((t) => t !== tag),
                                            }));
                                        }}
                                    />
                                    {tag}
                                </label>
                            ))}
                        </div>
                        <div className="size-options">
                            {['warm', 'cloudy', 'cold', 'cool', 'any'].map((weather) => (
                                <button
                                    key={weather}
                                    type="button"
                                    className={`size-chip ${newItem.weather === weather ? 'selected' : ''}`}
                                    onClick={() => setNewItem({ ...newItem, weather })}
                                >
                                    {weather}
                                </button>
                            ))}
                        </div>
                        <div className="size-options">
                            {['S', 'M', 'L'].map((size) => (
                                <button
                                    key={size}
                                    type="button"
                                    className={`size-chip ${newItem.size === size ? 'selected' : ''}`}
                                    onClick={() => setNewItem({ ...newItem, size })}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>

                        {errorMsg && <div className="error-message">{errorMsg}</div>}
                        <div className="modal-actions">
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                            <button onClick={addItem}>Add</button>
                        </div>
                    </div>
                </div>
            )}

            {selectedItem && (
                <div className="modal-overlay preview-overlay" onClick={() => setSelectedItem(null)}>
                    <div className="modal item-preview" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedItem.link} alt={selectedItem.name} className="modal-preview-img enlarged" />
                        <h3>{selectedItem.name}</h3>
                        <p>{selectedItem.status}</p>
                        {selectedItem.tags?.length > 0 && (
                            <div className="tag-badges">
                                {selectedItem.tags.map((tag, i) => (
                                    <span key={i} className="tag-badge">{tag}</span>
                                ))}
                            </div>
                        )}
                        <div className="modal-actions">
                            <button onClick={() => setSelectedItem(null)}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
            <Footer />

        </div>

    );
}
