import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [formData, setFormData] = useState({});
  const userId = JSON.parse(localStorage.getItem('loggedInUser')).id;

  useEffect(() => {
    fetch(`http://localhost:8080/api/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setFormData({
          name: data.name,
          email: data.email,
          bodyType: data.bodyMetrics?.bodyType || '',
          colorPalette: data.colorPalette || ''
        });
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const saveInfo = () => {
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
    };
    fetch(`http://localhost:8080/api/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser),
    })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setIsEditingInfo(false);
      });
  };

  const savePreferences = () => {
    const updatedUser = {
      ...user,
      bodyMetrics: {
        ...user.bodyMetrics,
        bodyType: formData.bodyType,
      },
      colorPalette: formData.colorPalette,
    };
    fetch(`http://localhost:8080/api/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      })
        .then(res => {
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
          return res.json();
        })
        .then(data => {
          setUser(data);
          setIsEditingPreferences(false);
        })
        .catch(error => {
          console.error('Error updating user:', error);
          // Optionally update state to display an error message in the UI
        });
      
      //.then(res => res.json())
      //.then(data => {
      //  setUser(data);
      //  setIsEditingPreferences(false);
      //});
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1 className="profile-title">Your Profile</h1>
        <p className="profile-subtitle">Manage your wardrobe, preferences, and account details.</p>
      </div>

      <div className="profile-content">
        {/* Personal Info */}
        <div className="profile-card">
          <h2>Personal Info</h2>
          {isEditingInfo ? (
            <>
              <p>
                <strong>Name:</strong><br />
                <input name="name" value={formData.name} onChange={handleChange} />
              </p>
              <p>
                <strong>Email:</strong><br />
                <input name="email" value={formData.email} onChange={handleChange} />
              </p>
              <button className="btn-primary" onClick={saveInfo}>Save</button>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <button className="btn-primary" onClick={() => setIsEditingInfo(true)}>Edit</button>
            </>
          )}
        </div>

        {/* Style Preferences
        <div className="profile-card">
          <h2>Style Preferences</h2>
          {isEditingPreferences ? (
            <>
              <p>
                <strong>Body Type:</strong><br />
                <input name="bodyType" value={formData.bodyType} onChange={handleChange} />
              </p>
              <p>
                <strong>Color Palette:</strong><br />
                <input name="colorPalette" value={formData.colorPalette} onChange={handleChange} />
              </p>
              <button className="btn-primary" onClick={savePreferences}>Save</button>
            </>
          ) : (
            <>
              <p><strong>Body Type:</strong> {user.bodyMetrics?.bodyType || 'N/A'}</p>
              <p><strong>Color Palette:</strong> {user.colorPalette || 'N/A'}</p>
              <button className="btn-primary" onClick={() => setIsEditingPreferences(true)}>Update</button>
            </>
          )}
        </div> */}

        {/* Wardrobe Summary */}
        <div className="profile-card">
          <h2>Wardrobe Summary</h2>
          <p><strong>Items:</strong> {(34 + user.closetImages?.length) || 34}</p>
          <p><strong>Favorite Brands:</strong> Zara, Uniqlo</p>
          <button className="btn-primary" onClick={() => navigate('/closet')}>View Closet</button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;