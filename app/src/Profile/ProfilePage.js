import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';
import Footer from "../Footer/Footer";

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
          height: data.bodyMetrics?.height || '',
          weight: data.bodyMetrics?.weight || '',
          chest: data.bodyMetrics?.chest || '',
          waist: data.bodyMetrics?.waist || '',
          hips: data.bodyMetrics?.hips || '',
          shoulders: data.bodyMetrics?.shoulders || ''
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
        height: formData.height,
        weight: formData.weight,
        chest: formData.chest,
        waist: formData.waist,
        hips: formData.hips,
        shoulders: formData.shoulders      },
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
        });

      //.then(res => res.json())
      //.then(data => {
      //  setUser(data);
      //  setIsEditingPreferences(false);
      //});
  };

  if (!user) return <div>Loading...</div>;

  return (
      <div>
        <div className="profile-page">
          <div className="profile-header">
            <h1 className="profile-title">Your Profile</h1>
            <p className="profile-subtitle">Manage your wardrobe, preferences, and account details.</p>
          </div>

          <div className="profile-content">
            <div className="profile-card-user-info">
              <h2 className="h2-profile">Personal Info</h2>
              {isEditingInfo ? (
                  <div className={"user-info-open"}>
                    <p className={"user-info-input-section"}>
                      <strong>Name:</strong><br/>
                      <input name="name" className={"name-edit-profile"} value={formData.name} onChange={handleChange}/>
                    </p>
                    <p className={"user-info-input-section"}>
                      <strong>Email:</strong><br/>
                      <input name="email" className={"email-edit-profile"} value={formData.email} onChange={handleChange}/>
                    </p>
                    <div className={"profile-button-container"}>
                      <button className="btn-primary" onClick={saveInfo}>Save</button>
                      <button className="btn-secondary" onClick={() => setIsEditingInfo(false)}>Cancel</button>
                    </div>
                    </div>
              ) : (
                  <>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                  <button className="btn-primary" onClick={() => setIsEditingInfo(true)}>Edit</button>
                </>
              )}
            </div>

            <div className="profile-card">
              <h2 className="h2-profile-2">Style Preferences</h2>
              {isEditingPreferences ? (
                  <>
                    <p className={"user-info-input-section"}>
                      <strong>Height:</strong><br/>
                      <input name="height" className={"style-edit-profile"} value={formData.height}
                             onChange={handleChange}/>
                    </p>
                    <p className={"user-info-input-section"}>
                      <strong>Weight:</strong><br/>
                      <input name="weight" className={"style-edit-profile"} value={formData.weight}
                             onChange={handleChange}/>
                    </p>
                    <p className={"user-info-input-section"}>
                      <strong>Chest:</strong><br/>
                      <input name="chest" className={"style-edit-profile"} value={formData.chest}
                             onChange={handleChange}/>
                    </p>
                    <p className={"user-info-input-section"}>
                      <strong>Waist:</strong><br/>
                      <input name="waist" className={"style-edit-profile"} value={formData.waist}
                             onChange={handleChange}/>
                    </p>
                    <p className={"user-info-input-section"}>
                      <strong>Hips:</strong><br/>
                      <input name="hips" className={"style-edit-profile"} value={formData.hips}
                             onChange={handleChange}/>
                    </p>
                    <p className={"user-info-input-section"}>
                      <strong>Shoulders:</strong><br/>
                      <input name="shoulders" className={"style-edit-profile"} value={formData.shoulders}
                             onChange={handleChange}/>
                    </p>
                    <div className={"profile-button-container"}>
                      <button className="btn-primary" onClick={savePreferences}>Save</button>
                      <button className="btn-secondary" onClick={() => setIsEditingPreferences(false)}>Cancel</button>
                    </div>
                  </>
              ) : (
                  <>
                    <p><strong>Height:</strong> {user.bodyMetrics?.height || 'N/A'}</p>
                    <p><strong>Weight:</strong> {user.bodyMetrics?.weight || 'N/A'}</p>
                    <p><strong>Chest:</strong> {user.bodyMetrics?.chest || 'N/A'}</p>
                    <p><strong>Waist:</strong> {user.bodyMetrics?.waist || 'N/A'}</p>
                    <p><strong>Hips:</strong> {user.bodyMetrics?.hips || 'N/A'}</p>
                    <p><strong>Shoulders:</strong> {user.bodyMetrics?.shoulders || 'N/A'}</p>
                    <button className="btn-primary" onClick={() => setIsEditingPreferences(true)}>Update</button>
                  </>
              )}
            </div>

            <div className="profile-card">
              <h2 className="h2-profile">Wardrobe Summary</h2>
              <p><strong>Items:</strong> {(34 + user.closetImages?.length) || 34}</p>
              <p><strong>Favorite Brands:</strong> Zara, Uniqlo</p>
              <div className={"profile-button-container"}>
                <button className="btn-primary view-closet-button" onClick={() => navigate('/closet')}>View Closet
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>

  );
}

export default ProfilePage;