import React, { useState } from 'react';
import './Closet.css';
import { uploadToCloudinary } from './uploadToCloudinary';



export default function Closet({ closetItems, setClosetItems }) {
    const [showModal, setShowModal] = useState(false);
    const [newItem, setNewItem] = useState({ name: '', image: '', status: '', tags: [] });
    const [activeCategory, setActiveCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [activeTag, setActiveTag] = useState('');

    const openModal = (category) => {
        setActiveCategory(category);
        setNewItem({ name: '', image: '', status: '', tags: [] });
        setShowModal(true);
        setErrorMsg('');
    };

    const addItem = () => {
        if (!newItem.name || !newItem.image) {
            setErrorMsg('Item name and image are required.');
            return;
        }
        setClosetItems((prev) => ({
            ...prev,
            [activeCategory]: [...prev[activeCategory], newItem],
        }));
        setShowModal(false);
    };

    return (
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
                    .filter((item) =>
                        item.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .filter((item) =>
                        activeTag ? item.tags?.includes(activeTag) : true
                    );

                return (
                    <div key={category} className="category-section">
                        <h3>{category.toUpperCase()} ({filteredItems.length})</h3>
                        <div className="card-grid">
                            {filteredItems.map((item, index) => (
                                <div key={index} className="card">
                                    <img src={item.image} alt={item.name} />
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

                        {/* Item Name */}
                        <input
                            type="text"
                            placeholder="Item Name"
                            value={newItem.name}
                            onChange={(e) => {
                                setNewItem({ ...newItem, name: e.target.value });
                                setErrorMsg('');
                            }}
                        />

                        {/* Image Upload */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={async (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const imageUrl = await uploadToCloudinary(file);
                                    if (imageUrl) {
                                        setNewItem({ ...newItem, image: imageUrl });
                                        setErrorMsg('');
                                    } else {
                                        setErrorMsg('Failed to upload image.');
                                    }
                                }
                            }}
                        />

                        {newItem.image && (
                            <img
                                src={newItem.image}
                                alt="Preview"
                                style={{
                                    width: '100%',
                                    maxHeight: '150px',
                                    objectFit: 'cover',
                                    borderRadius: '8px',
                                }}
                            />
                        )}

                        {/* Status */}
                        <input
                            type="text"
                            placeholder="Status (e.g., Worn Recently)"
                            value={newItem.status}
                            onChange={(e) =>
                                setNewItem({ ...newItem, status: e.target.value })
                            }
                        />

                        {/* Multi-select Tags */}
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

                        {/* Error message */}
                        {errorMsg && <div className="error-message">{errorMsg}</div>}

                        <div className="modal-actions">
                            <button onClick={() => setShowModal(false)}>Cancel</button>
                            <button onClick={addItem}>Add</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
