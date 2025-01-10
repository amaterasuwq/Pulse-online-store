import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/compiled-css/main-styles.css';
import '../styles/compiled-css/additional-pages.css';

const ShippingPage: React.FC = () => {
    const [trackingNumber, setTrackingNumber] = useState('');
    const [trackingSubmitted, setTrackingSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleTrack = (event: React.FormEvent) => {
        event.preventDefault();

        if (!/^\d+$/.test(trackingNumber)) {
            setErrorMessage('Tracking number should only contain numbers.');
            setTrackingSubmitted(false);
            return;
        }

        if (trackingNumber.length < 5) {
            setErrorMessage('Tracking number must be at least 5 digits long.');
            setTrackingSubmitted(false);
            return;
        }
        
        if (trackingNumber.length > 10) {
            setErrorMessage('Tracking number cannot exceed 10 digits.');
            setTrackingSubmitted(false);
            return;
        }
        
        setErrorMessage('');
        setTrackingSubmitted(true);
    };

    return (
        <div className="container">
            <div className="blackout"></div>
            <Header/>
            <div className="page-banner__title">
                <div className="page-banner__title__nav-definition">
                    <p>Shipping</p>
                </div>
                <div className="page-banner__title__text">
                    <p>Learn about our shipping options and track your order status.</p>
                </div>
            </div>

            <div className="shipping-page">
                <div className="shipping-page__info">
                    <h2>Shipping Information</h2>
                    <p>
                        We strive to deliver your orders as quickly and efficiently as possible. Here's what you need to know:
                    </p>
                    <ul>
                        <li><strong>Standard Shipping:</strong> 5-7 business days. Free for orders over $50; otherwise, $5.</li>
                        <li><strong>Express Shipping:</strong> 2-3 business days. $15 flat rate.</li>
                        <li><strong>Overnight Shipping:</strong> Next-day delivery. $25 flat rate.</li>
                    </ul>
                    <p>
                        Shipping times may vary depending on your location. For international shipping details, please{' '}
                        <a href="/contact-us">contact us</a>.
                    </p>
                </div>

                <div className="shipping-page__tracking">
                    <h2>Track Your Order</h2>
                    <form onSubmit={handleTrack}>
                        <div className="form-group">
                            <label htmlFor="trackingNumber">Enter Tracking Number</label>
                            <input
                                type="text"
                                id="trackingNumber"
                                name="trackingNumber"
                                value={trackingNumber}
                                onChange={(e) => setTrackingNumber(e.target.value)}
                                placeholder="Enter your tracking number"
                                required
                            />
                        </div>
                        <div className="button__container">
                        <button type="submit">Track Order</button>
                        </div>
                    </form>

                    {errorMessage && (
                        <div className="error-message">
                            <p>{errorMessage}</p>
                        </div>
                    )}

                    {trackingSubmitted && (
                        <div className="shipping-page__tracking-result">
                            <p>
                                Tracking information for <strong>{trackingNumber}</strong>:
                            </p>
                            <ul>
                                <li>Status: In Transit</li>
                                <li>Estimated Delivery: 3 days</li>
                            </ul>
                            <p>For more details, visit our <a href="/contact-us">support page</a>.</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ShippingPage;
