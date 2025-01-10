import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/compiled-css/main-styles.css';
import '../styles/compiled-css/additional-pages.css';

const LocationPage: React.FC = () => {
    return (
        <div className="container">
            <div className="blackout"></div>
            <Header/>
            <div className="page-banner__title">
                <div className="page-banner__title__nav-definition">
                    <p>Our Location</p>
                </div>
                <div className="page-banner__title__text">
                    <p>Find our physical store</p>
                </div>
            </div>

            <div className="location-page">
                <div className="location-page__map">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.678150321841!2d-73.98976828459869!3d40.75288207932738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af18e50a1b%3A0x63f92c8d08f2466a!2s123%20Fashion%20Ave%2C%20New%20York%2C%20NY%2010001%2C%20USA!5e0!3m2!1sen!2sus!4v1692810767468!5m2!1sen!2sus"
                        width="50%"
                        height="400"
                        style={{ border: 1 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Maps Location"
                    ></iframe>
                </div>

                <div className="location-page__details">
                    <h2>Store Address</h2>
                    <p>123 Fashion Avenue</p>
                    <p>United States, New York, NY 10001</p>

                    <h2>Opening Hours</h2>
                    <p>Monday - Friday: 9:00 AM - 9:00 PM</p>
                    <p>Saturday: 10:00 AM - 8:00 PM</p>
                    <p>Sunday: 11:00 AM - 6:00 PM</p>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default LocationPage;
