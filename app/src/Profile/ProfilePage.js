import React from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
    return (
        <div className="profile-page">
            <div className="profile-header">
                <h1 className="profile-title">Your Profile</h1>
                <p className="profile-subtitle">Manage your wardrobe, preferences, and account details.</p>
            </div>

            <div className="profile-content">
                <div className="profile-card">
                    <h2>Personal Info</h2>
                    <p><strong>Name:</strong> Jane Doe</p>
                    <p><strong>Email:</strong> jane.doe@example.com</p>
                    <button className="btn-primary">Edit</button>
                </div>

                <div className="profile-card">
                    <h2>Style Preferences</h2>
                    <p><strong>Body Type:</strong> Athletic</p>
                    <p><strong>Color Palette:</strong> Cool tones</p>
                    <button className="btn-primary">Update</button>
                </div>

                <div className="profile-card">
                    <h2>Wardrobe Summary</h2>
                    <p><strong>Items:</strong> 37</p>
                    <p><strong>Favorite Brands:</strong> Zara, Uniqlo</p>
                    <button className="btn-primary">View Closet</button>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
