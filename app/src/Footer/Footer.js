import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import logo from "../assets/images/OutfitlyLogo.png";

const Footer = () => {
    return (
        <div className='footer-container'>
            <section>
                <div className='footer-links'>
                    <div className='footer-link-wrapper'>
                        <div className='footer-link-items'>
                            <h2>About Outfitly</h2>
                            <Link to='/how-it-works'>How It Works</Link>
                            <Link to='/testimonials'>Testimonials</Link>
                            <Link to='/careers'>Careers</Link>
                            <Link to='/terms'>Terms of Service</Link>
                        </div>
                        <div className='footer-link-items'>
                            <h2>Support</h2>
                            <Link to='/contact'>Contact</Link>
                            <Link to='/faq'>FAQ</Link>
                            <Link to='/closet-help'>Closet Help</Link>
                        </div>
                    </div>
                    <div className='footer-link-wrapper'>
                        <div className='footer-link-items'>
                            <h2>Discover</h2>
                            <Link to='/style-tips'>Style Tips</Link>
                            <Link to='/weather-sync'>Weather Integration</Link>
                            <Link to='/outfit-planner'>Outfit Planner</Link>
                            <Link to='/blog'>Blog</Link>
                        </div>
                        <div className='footer-link-items'>
                            <h2>Connect</h2>
                            <Link to='/'>Instagram</Link>
                            <Link to='/'>Facebook</Link>
                            <Link to='/'>YouTube</Link>
                            <Link to='/'>X</Link>
                            <Link to='/'>LinkedIn</Link>
                        </div>
                    </div>
                </div>

                <section className='social-media'>
                    <div className='social-media-wrap'>
                        <div className='footer-logo'>
                            <Link to='/' className='social-logo'>
                                <img src={logo} alt="Outfitly" style={{ width: '90px', height: 'auto' }} />
                            </Link>
                        </div>
                        <small className='website-rights'>Outfitly © 2025</small>
                        <div className='social-icons'>
                            <Link className='social-icon-link facebook' to='/' target='_blank' aria-label='Facebook'>
                                <i className='fab fa-facebook-f' />
                            </Link>
                            <Link className='social-icon-link instagram' to='/' target='_blank' aria-label='Instagram'>
                                <i className='fab fa-instagram' />
                            </Link>
                            <Link className='social-icon-link youtube' to='/' target='_blank' aria-label='Youtube'>
                                <i className='fab fa-youtube' />
                            </Link>
                            <Link className='social-icon-link twitter' to='/' target='_blank' aria-label='Twitter'>
                                <i className="fa-brands fa-x-twitter"></i>
                            </Link>
                            <Link className='social-icon-link linkedin' to='/' target='_blank' aria-label='LinkedIn'>
                                <i className='fab fa-linkedin' />
                            </Link>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );
}

export default Footer;
