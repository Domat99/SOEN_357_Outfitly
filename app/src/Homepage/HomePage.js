import React from 'react';
import './HomePage.css';
import mainHomePagePic from "../assets/images/Main_Page_Picture.png";



const HomePage = () => {
    return (
        <div className="homepage">
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="title">Discover Your Style, Daily.</h1>
                        <p className="subtitle">
                            Outfitly is your AI-powered personal stylist that curates outfits based on your wardrobe, weather, and preferences — so you never stress over what to wear again.
                        </p>
                        <div className="cta-buttons">
                            <button className="btn-primary-home">Get Started</button>
                            <button className="btn-outline">Log In</button>
                        </div>
                    </div>
                    <div className="hero-image">
                        <img src={mainHomePagePic} alt="Stylish wardrobe preview" />
                    </div>
                </div>
            </section>

            <section className="features">
                <h2 className="section-title">Why Outfitly?</h2>
                <p className="section-subtext">
                    We simplify daily outfit decisions with smart, beautiful suggestions — crafted just for you.
                </p>

                <div className="feature-grid">
                    <div className="feature-card">
                        <i className="fas fa-tshirt feature-icon"></i>
                        <h3>Personalized Outfits</h3>
                        <p>Based on your body shape, style preferences & wardrobe.</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-cloud-sun feature-icon"></i>
                        <h3>Weather-Aware</h3>
                        <p>Style suggestions that adapt to real-time weather conditions.</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-chart-line feature-icon"></i>
                        <h3>Smart Feedback</h3>
                        <p>AI learns from your likes, dislikes, and past choices.</p>
                    </div>
                </div>
            </section>
            <section className="how-it-works">
                <h2>How It Works</h2>
                <div className="steps">
                    <div className="step">
                        <span className="step-number">1</span>
                        <h4>Upload Your Wardrobe</h4>
                        <p>Add pictures of your real clothes or choose from a catalog.</p>
                    </div>
                    <div className="step">
                        <span className="step-number">2</span>
                        <h4>Set Your Style</h4>
                        <p>Tell us your body type, color palette, and mood.</p>
                    </div>
                    <div className="step">
                        <span className="step-number">3</span>
                        <h4>Get Daily Outfit Ideas</h4>
                        <p>Smart suggestions that match the weather and your vibe.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
