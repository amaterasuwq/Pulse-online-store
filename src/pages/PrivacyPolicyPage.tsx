import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/compiled-css/main-styles.css';
import '../styles/compiled-css/additional-pages.css';

const PrivacyPolicyPage: React.FC = () => {
    return (
        <div className="container">
            <div className="blackout"></div>
            <Header/>
            <div className="page-banner__title">
                <div className="page-banner__title__nav-definition">
                    <p>Privacy Policy</p>
                </div>
                <div className="page-banner__title__text">
                    <p>Understand how we collect, use, and protect your information.</p>
                </div>
            </div>

            <div className="privacy-policy-page">
                <div className="privacy-policy-page__section">
                    <p>
                        Your privacy is important to us. This policy outlines how we handle your personal information
                        and what steps we take to ensure it remains secure.
                    </p>
                </div>

                <div className="privacy-policy-page__section">
                    <h2>What Information We Collect</h2>
                    <ul>
                        <li>Personal details like name, email, and contact number when you register or place an order.</li>
                        <li>
                            Payment information required for processing your transactions, stored securely through
                            encrypted systems.
                        </li>
                        <li>
                            Behavioral data like browsing patterns and preferences to improve our services and
                            personalization.
                        </li>
                    </ul>
                </div>

                <div className="privacy-policy-page__section">
                    <h2>For What We Use Your Information</h2>
                    <ul>
                        <li>To process your orders.</li>
                        <li>To provide a personalized shopping experience and recommend products.</li>
                        <li>To improve website functionality and services.</li>
                        <li>To communicate important updates, promotional offers, and newsletters.</li>
                    </ul>
                </div>

                <div className="privacy-policy-page__section">
                    <h2>Sharing Your Information</h2>
                    <p>
                        We respect your privacy and do not sell your personal data to third parties. However, we may
                        share your information with trusted service providers to:
                    </p>
                    <ul className='privacy-policy-page__special-ul'>
                        <li>Process payments securely.</li>
                        <li>Deliver your orders promptly.</li>
                        <li>Analyze website performance and user experience.</li>
                    </ul>
                </div>

                <div className="privacy-policy-page__section">
                    <h2>How We Protect Your Information</h2>
                    <p>
                        We implement industry-standard security measures to protect your data, including SSL encryption
                        for secure transactions and restricted access to sensitive information.
                    </p>
                </div>

                <div className="privacy-policy-page__section">
                    <h2>Your Rights</h2>
                    <ul>
                        <li>Access your personal data stored with us.</li>
                        <li>Request corrections to inaccurate or incomplete information.</li>
                        <li>Request deletion of your personal information under certain conditions.</li>
                    </ul>
                </div>

                <div className="privacy-policy-page__section">
                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions or concerns regarding this policy, please{' '}
                        <a href="/contact-us">contact us</a>.
                    </p>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default PrivacyPolicyPage;
