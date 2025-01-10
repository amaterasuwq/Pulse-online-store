import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/compiled-css/main-styles.css';
import '../styles/compiled-css/additional-pages.css';

const CookiePolicyPage: React.FC = () => {
    return (
        <div className="container">
            <div className="blackout"></div>
            <Header/>
            <div className="page-banner__title">
                <div className="page-banner__title__nav-definition">
                    <p>Cookie Policy</p>
                </div>
                <div className="page-banner__title__text">
                    <p>Understand how we use cookies to improve your experience.</p>
                </div>
            </div>
            <div className="cookie-policy-page">
                <section>
                    <p>
                        We value your privacy and are committed to ensuring transparency about how we collect and use information.
                        This Cookie Policy explains how we use cookies and similar technologies on our website.
                    </p>
                </section>

                <section>
                    <h2>What Are Cookies?</h2>
                    <p>
                        Cookies are small text files that are stored on your device when you visit a website. They help the website
                        remember information about your visit, like your preferences and settings, to improve your browsing experience.
                    </p>
                </section>

                <section>
                    <h2>Types of Cookies We Use</h2>
                    <ul>
                        <li>
                            <strong>Essential Cookies:</strong> Necessary for the website to function properly, enabling core features
                            like page navigation and secure areas.
                        </li>
                        <li>
                            <strong>Performance Cookies:</strong> Collect information about how visitors use the website, such as which
                            pages are most visited, to help us improve performance.
                        </li>
                        <li>
                            <strong>Functionality Cookies:</strong> Allow the website to remember your preferences, such as language and
                            region, for a personalized experience.
                        </li>
                        <li>
                            <strong>Targeting/Advertising Cookies:</strong> Track your browsing habits to deliver ads relevant to your interests.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2>How We Use Cookies</h2>
                    <p>We use cookies to:</p>
                    <ul>
                        <li>Recognize returning visitors.</li>
                        <li>Analyze site performance and usage.</li>
                        <li>Provide personalized content and ads.</li>
                        <li>Enhance website functionality and usability.</li>
                    </ul>
                </section>

                <section>
                    <h2>Third-Party Cookies</h2>
                    <p>
                        We may allow third-party services to place cookies on your device. These include analytics services like Google Analytics and advertising networks.
                        These third parties have their own privacy policies.
                    </p>
                </section>

                <section>
                    <h2>Managing Cookies</h2>
                    <p>
                        You can manage or disable cookies in your browser settings. However, please note that disabling cookies may impact your experience on our website.
                    </p>
                    <p>Here are links to manage cookies in popular browsers:</p>
                    <ul>
                        <li><a href="https://support.google.com/accounts/answer/61416" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
                        <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
                        <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
                        <li><a href="https://support.apple.com/en-us/HT201265" target="_blank" rel="noopener noreferrer">Safari</a></li>
                    </ul>
                </section>

                <section>
                    <h2>Updates to This Policy</h2>
                    <p>
                        We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
                    </p>
                </section>
            </div>
            <Footer/>
        </div>
    );
};

export default CookiePolicyPage;
