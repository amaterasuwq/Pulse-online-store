import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/compiled-css/main-styles.css';
import '../styles/compiled-css/additional-pages.css';

const ContactUsPage: React.FC = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormSubmitted(true);
        setTimeout(() => {
            setFormSubmitted(false);
        }, 5000);
    };

    return (
        <div className="container">
            <div className="blackout"></div>
            <Header/>
            <div className="page-banner__title">
                <div className="page-banner__title__nav-definition">
                    <p>Contact Us</p>
                </div>
                <div className="page-banner__title__text">
                    <p>Have questions or need help? We'd love to hear from you!</p>
                </div>
            </div>

            <div className="contact-us-page">
                <img src="/images/other/icon.png" alt="Logo" />
                <div className="contact-us-page__info">
                    <h2>Our Contact Details</h2>
                    <p>
                        <strong>Email:</strong> support@thepulse.com
                    </p>
                    <p>
                        <strong>Phone:</strong> +1 (123) 456-7890
                    </p>
                    <div className="contact-us-page__social">
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                            <i className="fa-brands fa-twitter"></i>
                        </a>
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <i className="fa-brands fa-facebook"></i>
                        </a>
                    </div>
                </div>

                <div className="contact-us-page__form">
                    <h2>Send Us a Message</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input type="text" id="name" name="name" placeholder="Enter your name" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Your Email</label>
                            <input type="email" id="email" name="email" placeholder="Enter your email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Your Message</label>
                            <textarea id="message" name="message" rows={5} placeholder="Type your message here..." required></textarea>
                        </div>
                        <button type="submit">Send Message</button>
                    </form>
                    {formSubmitted && (
                        <div className="form-success-message" style={{ color: 'green', marginTop: '15px' }}>
                            Your message has been sent successfully!
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ContactUsPage;
