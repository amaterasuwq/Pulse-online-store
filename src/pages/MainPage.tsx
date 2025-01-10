import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/compiled-css/main-page.css';
import '../styles/compiled-css/main-styles.css';

const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState<string | null>(null);
    const [messageColor, setMessageColor] = useState<string>('');

    useEffect(() => {
        if (message) {
            const timeout = setTimeout(() => {
                setMessage(null);
            }, 3000);

            return () => clearTimeout(timeout);
        }
    }, [message]);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailPattern.test(email)) {
            const subscribedEmails = JSON.parse(localStorage.getItem('subscribedEmails') || '[]');

            if (subscribedEmails.includes(email)) {
                setMessage("You're already subscribed!");
                setMessageColor('orange');
            } else {
                subscribedEmails.push(email);
                localStorage.setItem('subscribedEmails', JSON.stringify(subscribedEmails));
                setMessage('Subscribed successfully!');
                setMessageColor('green');
                setEmail('');
            }
        } else {
            setMessage('Please enter a valid email address!');
            setMessageColor('red');
        }
    };

    const handleRedirect = () => {
        navigate('/shop');
    };

    return (
        <div className='container main-page'>
            <div className="blackout"></div>
            <Header/>
            <div className="header__welcome-banner">
                <div className="header__welcome-banner__text">
                    <div className="header__welcome-banner__text__title">
                        <p>Welcome to "The Pulse" online clothes store</p>
                    </div>
                    <div className="header__welcome-banner__text__subtitle">
                        <p>
                            Step into the Pulse of Fashion - Unleashing Bold Trends, Exclusive Collections, and
                            Unmatched Style to Elevate Your Wardrobe and Express Your Unique Identity. All of our
                            clothes are one size, so they will perfectly fit everyone!
                        </p>
                    </div>
                </div>
            </div>
            <div className="main-page__categories">
                <div className="main-page__categories__items">
                    <div className="main-page__categories__items__left-boxes">
                        <div className="main-page__categories__items__item">
                            <div className="main-page__categories__items__item__text">
                                <div className="main-page__categories__items__item__text__tag">
                                    <p>#Shoes</p>
                                </div>
                                <div className="main-page__categories__items__item__text__title">
                                    <p>Step into Style: Explore Our Shoes Collection</p>
                                </div>
                            </div>
                            <div className="main-page__categories__items__item__image">
                                <img src="/images/staff/shoes/nike_airForce.png" alt="Shoes" />
                            </div>
                        </div>

                        <div className="main-page__categories__items__item">
                            <div className="main-page__categories__items__item__text">
                                <div className="main-page__categories__items__item__text__tag">
                                    <p>#Backpacks</p>
                                </div>
                                <div className="main-page__categories__items__item__text__title">
                                    <p>Carry Your Essentials in Style: Shop Our Backpacks</p>
                                </div>
                            </div>
                            <div className="main-page__categories__items__item__image">
                                <img src="/images/staff/backpacks/adidas_airBag.png" alt="Backpacks" />
                            </div>
                        </div>
                    </div>

                    <div className="main-page__categories__items__right-box">
                        <div className="main-page__categories__items__item">
                            <div className="main-page__categories__items__item__text">
                                <div className="main-page__categories__items__item__text__tag">
                                    <p>#Clothes</p>
                                </div>
                                <div className="main-page__categories__items__item__text__title">
                                    <p>Elevate Your Wardrobe: Discover Our Clothing Collection</p>
                                </div>
                            </div>
                            <div className="main-page__categories__items__item__image">
                                <img src="/images/staff/t-shirts/off-white_jordan.png" alt="Clothes" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="main-page__categories__button">
                    <button onClick={handleRedirect}>All Categories</button>
                </div>
            </div>

            <div className="main-page__newsletter">
                <div className="main-page__newsletter__title">
                    <p>Join our newsletter</p>
                </div>
                <div className="main-page__newsletter__subtitle">
                    <p>Be the First to Know: Sign Up for Exclusive Updates, Trends, and Offers</p>
                </div>
                <div className="main-page__newsletter__subscribe">
                    <form onSubmit={handleSubscribe}>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button type="submit">Subscribe</button>
                    </form>
                    {message && (
                        <p className="main-page__newsletter__message" style={{ color: messageColor }}>
                            {message}
                        </p>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default MainPage;
