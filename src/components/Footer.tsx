import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer__links">
                <div className="footer__links__social-media">
                    <img src="/images/other/logo.png" alt="logo" />
                    <p>Contact us in the most comfortable way for you!</p>
                    <p>Call us: +48 777888111</p>
                    <div className="footer__links__social-media__icons">
                        <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a href="https://web.telegram.org/k/" target="_blank" rel="noreferrer" aria-label="Telegram">
                            <i className="fa-brands fa-telegram"></i>
                        </a>
                        <a href="https://x.com/?lang=en-" target="_blank" rel="noreferrer" aria-label="Twitter">
                            <i className="fa-brands fa-twitter"></i>
                        </a>
                    </div>
                </div>

                <div className="footer__links__others__container">
                    <div className="footer__links__others">
                        <p className="footer__links__others__title">Store</p>
                        <Link to="/location">Location</Link>
                        <Link to="/contact-us">Contact Us</Link>
                        <Link to="/store-details">Store Details</Link>
                    </div>

                    <div className="footer__links__others">
                        <p className="footer__links__others__title">Products</p>
                        <Link to="/return-product">Return Product</Link>
                        <Link to="/shipping">Shipping</Link>
                    </div>

                    <div className="footer__links__others">
                        <p className="footer__links__others__title">Payments</p>
                        <Link to="/payment-options">Payment Options</Link>
                    </div>

                    <div className="footer__links__others">
                        <p className="footer__links__others__title">Privacy</p>
                        <Link to="/privacy-policy">Privacy Policy</Link>
                        <Link to="/terms-and-conditions">Terms and Conditions</Link>
                        <Link to="/cookie-policy">Cookie Policy</Link>
                    </div>
                </div>
            </div>
            <div className="footer__copyright">
                <p>The Pulse 2025, All rights reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
