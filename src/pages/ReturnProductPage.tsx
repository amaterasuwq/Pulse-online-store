import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/compiled-css/main-styles.css';
import '../styles/compiled-css/additional-pages.css';

const ReturnProductPage: React.FC = () => {
    const [returnSubmitted, setReturnSubmitted] = useState(false);
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setReturnSubmitted(true);
    };

    return (
        <div className="container">
            <div className="blackout"></div>
            <Header/>
            <div className="page-banner__title">
                <div className="page-banner__title__nav-definition">
                    <p>Return Product</p>
                </div>
                <div className="page-banner__title__text">
                    <p>Hassle-Free Returns for a Better Shopping Experience</p>
                </div>
            </div>

            <div className="return-product-page">
                <div className="return-product-page__policy">
                    <h2>Return Policy</h2>
                    <p>
                        We offer a 30-day return policy for all purchases. To be eligible for a return:
                    </p>
                    <ul>
                        <li>Items must be in their original condition, unworn, and with all tags attached.</li>
                        <li>Returns must include the original receipt or proof of purchase.</li>
                        <li>Return shipping costs are the customer's responsibility unless the item is defective.</li>
                    </ul>
                </div>

                <div className="return-product-page__form">
                    <h2>Return Form</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="orderId">Order ID</label>
                            <input
                                type="text"
                                id="orderId"
                                name="orderId"
                                placeholder="Enter your order ID"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="reason">Reason for Return</label>
                            <textarea
                                id="reason"
                                name="reason"
                                rows={4}
                                placeholder="Provide the reason for returning the product"
                                required
                            ></textarea>
                        </div>
                        <div className="button__container">
                            <button type="submit">Submit Return Request</button>
                        </div>
                    </form>
                    {returnSubmitted && (
                        <div className="return-product-page__success-message">
                            <p>Your return request has been submitted successfully. We will contact you shortly!</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ReturnProductPage;
