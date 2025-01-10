import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/compiled-css/main-styles.css';
import '../styles/compiled-css/additional-pages.css';

const TermsAndConditionsPage: React.FC = () => {
    return (
        <div className="container">
            <div className="blackout"></div>
            <Header/>
            <div className="page-banner__title">
                <div className="page-banner__title__nav-definition">
                    <p>Terms and Conditions</p>
                </div>
                <div className="page-banner__title__text">
                    <p>Please read our terms carefully before using our services.</p>
                </div>
            </div>

            <div className="terms-and-conditions-page">
                <div className="terms-and-conditions-page__section">
                    <h2>Introduction</h2>
                    <p>
                        Welcome to The Pulse! By accessing or using our website, you agree to be bound by these Terms
                        and Conditions. If you do not agree, please refrain from using our services.
                    </p>
                </div>

                <div className="terms-and-conditions-page__section">
                    <h2>Eligibility</h2>
                    <p>
                        You must be at least 12 years old or have parental/guardian consent to use our services. By
                        accessing our website, you confirm that you meet these requirements.
                    </p>
                </div>

                <div className="terms-and-conditions-page__section">
                    <h2>Orders and Payments</h2>
                    <ul>
                        <li>
                            All orders are subject to availability. We reserve the right to cancel or refuse any order.
                        </li>
                        <li>
                            Prices and promotions are subject to change without prior notice.
                        </li>
                        <li>
                            Payments must be made at the time of purchase through the available methods.
                        </li>
                    </ul>
                </div>

                <div className="terms-and-conditions-page__section">
                    <h2>Shipping and Delivery</h2>
                    <p>
                        Estimated delivery times are provided for reference only. We are not responsible for delays due
                        to shipping carriers or unforeseen circumstances.
                    </p>
                </div>

                <div className="terms-and-conditions-page__section">
                    <h2>Returns and Refunds</h2>
                    <p>
                        Please refer to our <a href="/return-product">Return Product</a> policy for details on
                        eligibility, procedures, and timelines for returns and refunds.
                    </p>
                </div>

                <div className="terms-and-conditions-page__section">
                    <h2>User Conduct</h2>
                    <ul>
                        <li>You agree not to use our website for any unlawful or harmful purposes.</li>
                        <li>
                            You must not engage in activities that disrupt or damage the website, its services, or its
                            reputation.
                        </li>
                        <li>
                            We reserve the right to terminate or suspend your access if you violate these terms or
                            applicable laws.
                        </li>
                    </ul>
                </div>

                <div className="terms-and-conditions-page__section">
                    <h2>Intellectual Property</h2>
                    <p>
                        All content on this website, including images, text, and logos, is the property of The Pulse or
                        its licensors. Unauthorized reproduction or use is prohibited.
                    </p>
                </div>

                <div className="terms-and-conditions-page__section">
                    <h2>Limitation of Liability</h2>
                    <p>
                        The Pulse shall not be held liable for any direct, indirect, or consequential damages resulting
                        from the use of our website or services.
                    </p>
                </div>

                <div className="terms-and-conditions-page__section">
                    <h2>Amendments</h2>
                    <p>
                        We reserve the right to modify these Terms and Conditions at any time. Changes will be
                        communicated via the website and become effective upon posting.
                    </p>
                </div>

                <div className="terms-and-conditions-page__section">
                    <h2>Governing Law</h2>
                    <p>
                        These Terms and Conditions shall be governed by the laws of United States. Any disputes
                        arising under these terms shall be resolved exclusively by the competent courts of United States.
                    </p>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default TermsAndConditionsPage;