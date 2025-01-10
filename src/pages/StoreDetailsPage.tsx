import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/compiled-css/main-styles.css';
import '../styles/compiled-css/additional-pages.css';

const StoreDetailsPage: React.FC = () => {
    return (
        <div className="container">
            <div className="blackout"></div>
            <Header/>
            <div className="page-banner__title">
                <div className="page-banner__title__nav-definition">
                    <p>Store Details</p>
                </div>
                <div className="page-banner__title__text">
                    <p>Discover more about our store and its unique offerings.</p>
                </div>
            </div>

            <div className="store-details-page">
                <div className="store-details-page__highlights">
                    <h2>Why Visit Our Store?</h2>
                    <p>Exclusive in-store collections and limited-edition items.</p>
                    <p>Eco-friendly and sustainable shopping experience.</p>
                    <p>Community events and workshops for fashion enthusiasts.</p>
                </div>

                <div className="store-details-page__gallery">
                    <h2>Explore Our Store</h2>
                    <div className="gallery">

                        <img src="/images/interior/interior1.jpg" alt="Store Interior" />
                        <img src="/images/interior/interior2.jpg" alt="Store Interior" />
                        <img src="/images/interior/interior3.jpg" alt="Store Interior" />
                    </div>
                </div>

                <div className="store-details-page__testimonials">
                    <h2>What Our Customers Say</h2>
                    <div className="testimonial">
                        <p>"I love shopping here! The staff is so friendly, and the collections are amazing!"</p>
                        <p>- Sarah W.</p>
                    </div>
                    <div className="testimonial">
                        <p>"A great experience every time. The personal styling appointments are a game changer!"</p>
                        <p>- James L.</p>
                    </div>
                    <div className="testimonial">
                        <p>
                            "Shopping here is always a pleasure. The customer service is outstanding, and I always find something unique."
                        </p>
                        <p>- Emily R.</p>
                    </div>

                </div>

                <div className="store-details-page__faqs">
                    <h2>Frequently Asked Questions</h2>
                    <div className="faq">
                        <p><strong>Q:</strong> Is parking available near the store?</p>
                        <p><strong>A:</strong> Yes, we offer free parking for all visitors</p>
                    </div>
                    <div className="faq">
                        <p><strong>Q:</strong> Are pets allowed in the store?</p>
                        <p><strong>A:</strong> Yes, our store is pet-friendly</p>
                    </div>
                    <div className="faq">
                        <p><strong>Q:</strong> Do you offer refunds or exchanges?</p>
                        <p><strong>A:</strong> Yes, we have a 30-day return policy. Please check our <a href="/return-product">Return Policy</a> for details</p>
                    </div>
                    <div className="faq">
                        <p><strong>Q:</strong> What payment methods do you accept?</p>
                        <p><strong>A:</strong> We accept cash, credit cards, debit cards, and other payment options like PayPal or Link. Check <a href="/terms-and-conditions">Payment options</a> for more details</p>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default StoreDetailsPage;
