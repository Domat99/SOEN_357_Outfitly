import React, { useState } from 'react';
import './Closet.css';

const initialClosetItems = {
    Layers: [
        {
            name: 'Trench Coat',
            image: 'https://coach.scene7.com/is/image/Coach/cv463_kha_a0?$desktopProduct$',
            status: 'Not Worn Recently',
            tags: ['Formal', 'Work']

        },
        {
            name: 'Blazer',
            image: 'https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/Q98055s5.jpg?im=Resize,width=750',
            status: 'Worn Recently',
            tags: ['Casual', 'Travel']

        },
        {
            name: 'Denim Jacket',
            image: 'https://coach.scene7.com/is/image/Coach/cv463_kha_a0?$desktopProduct$',
            status: 'Worn This Week',
            tags: ['Casual']

        },
    ],
    Shirts: [
        {
            name: 'Striped Tee',
            image: 'https://joefresh-resource-dev.joefresh.com/JF/b1/S5WR055252/Black/5Z.jpg',
            status: 'Not Worn Recently',
            tags: ['Casual']

        },
        {
            name: 'Button Down',
            image: 'https://m.media-amazon.com/images/I/711DVmlvM1L._AC_SX679_.jpg',
            status: 'Worn This Week',
            tags: ['Work', 'Formal']

        },
        {
            name: 'White Crop Top',
            image: 'https://coach.scene7.com/is/image/Coach/cv463_kha_a0?$desktopProduct$',
            status: 'Worn Recently',
            tags: ['Casual']

        },
        {
            name: 'Graphic Tee',
            image: 'https://coach.scene7.com/is/image/Coach/cv463_kha_a0?$desktopProduct$',
            status: 'Not Worn Recently',
            tags: ['Casual']

        },
    ],
    Pants: [
        {
            name: 'Khaki Shorts',
            image: 'https://www.gapcanada.ca/webcontent/0054/784/169/cn54784169.jpg',
            status: 'Worn Recently',
            tags: ['Casual', 'Travel']

        },
        {
            name: 'Jeans',
            image: 'https://img.abercrombie.com/is/image/anf/KIC_155-4637-00651-278_prod1.jpg?policy=product-large',
            status: 'Not Worn Recently',
            tags: ['Casual']

        },
        {
            name: 'Black Leggings',
            image: 'https://coach.scene7.com/is/image/Coach/cv463_kha_a0?$desktopProduct$',
            status: 'Worn Recently',
            tags: ['Casual', 'Sport']

        },
    ],
    Dresses: [
        {
            name: 'Floral Maxi Dress',
            image: 'https://coach.scene7.com/is/image/Coach/cv463_kha_a0?$desktopProduct$',
            status: 'Not Worn Recently',
            tags: ['Work', 'Formal']

        },
        {
            name: 'Red Bodycon',
            image: 'https://coach.scene7.com/is/image/Coach/cv463_kha_a0?$desktopProduct$',
            status: 'Worn This Week',
            tags: ['Party', 'Formal']

        },
    ],
    Shoes: [
        {
            name: 'White Sneakers',
            image: 'https://coach.scene7.com/is/image/Coach/cv463_kha_a0?$desktopProduct$',
            status: 'Worn Recently',
            tags: ['Casual', 'Sport']

        },
        {
            name: 'Black Heels',
            image: 'https://coach.scene7.com/is/image/Coach/cv463_kha_a0?$desktopProduct$',
            status: 'Not Worn Recently',
            tags: ['Party', 'Formal']

        },
        {
            name: 'Brown Loafers',
            image: 'https://coach.scene7.com/is/image/Coach/cv463_kha_a0?$desktopProduct$',
            status: 'Worn This Week',
            tags: ['Work', 'Formal']

        },
    ],
    Accessories: [
        {
            name: 'Gold Hoop Earrings',
            image: 'https://coach.scene7.com/is/image/Coach/cv463_kha_a0?$desktopProduct$',
            status: 'Worn Recently',
            tags: ['Party']

        },
        {
            name: 'Black Leather Belt',
            image: 'https://coach.scene7.com/is/image/Coach/cv463_kha_a0?$desktopProduct$',
            status: 'Worn Recently',
            tags: ['Work', 'Formal']

        },
    ],
};

export default function Closet() {
    const [closetItems, setClosetItems] = useState(initialClosetItems);
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
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setNewItem({ ...newItem, image: reader.result });
                                        setErrorMsg('');
                                    };
                                    reader.readAsDataURL(file);
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
