import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/compiled-css/main-styles.css';
import '../styles/compiled-css/additional-pages.css';

const PaymentOptionsPage: React.FC = () => {
    return (
        <div className="container">
            <div className="blackout"></div>
            <Header/>
            <div className="page-banner__title">
                <div className="page-banner__title__nav-definition">
                    <p>Payment Options</p>
                </div>
                <div className="page-banner__title__text">
                    <p>Choose from a variety of secure and convenient payment methods.</p>
                </div>
            </div>

            <div className="payment-options-page">
                <div className="payment-options-page__methods">
                    <h2>Our Payment Methods</h2>
                    <ul>
                        <li>Visa</li>
                        <li>MasterCard</li>
                        <li>American Express</li>
                        <li>PayPal</li>
                        <li>Link</li>
                    </ul>
                    <p>All transactions are secured and encrypted for your protection.</p>
                </div>

                <div className="payment-options-page__additional-info">
                    <h2>Additional Information</h2>
                    <p>
                        Please ensure your payment details are accurate to avoid delays. If you experience any issues,
                        feel free to <a href="/contact-us">contact our support team</a>.
                    </p>
                    <p>
                        Refunds are processed within 7-10 business days. For more details, visit our{' '}
                        <a href="/terms-and-conditions">Terms and Conditions</a> page.
                    </p>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default PaymentOptionsPage;
