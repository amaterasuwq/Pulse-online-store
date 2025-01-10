import React, { useState, useEffect } from 'react';
import '../styles/compiled-css/main-styles.css';
import Cart from './Cart';

const Header: React.FC = () => {
    const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const commonNavigation = document.querySelector('.header__navigation') as HTMLElement;
        const mobileNavigation = document.querySelector('.header__mobile-navigation') as HTMLElement;
        const blackout = document.querySelector('.blackout') as HTMLElement;

        if (isMobileNavigationOpen) {
            if (commonNavigation) commonNavigation.style.display = 'none';
            if (mobileNavigation) mobileNavigation.style.display = 'flex';
            if (blackout) blackout.style.display = 'block';
        } else {
            if (commonNavigation) commonNavigation.style.display = 'flex';
            if (mobileNavigation) mobileNavigation.style.display = 'none';
            if (blackout) blackout.style.display = 'none';
        }
    }, [isMobileNavigationOpen]);

    const openCart = () => {
        setIsCartOpen(true);
    };

    const closeCart = () => {
        setIsCartOpen(false);
    };

    const openMobileNavigation = () => setIsMobileNavigationOpen(true);
    const closeMobileNavigation = () => setIsMobileNavigationOpen(false);

    return (
        <>
            <Cart isCartOpen={isCartOpen} closeCart={closeCart} data-testid="cart-close-button"/>

            <header className="header">
                <div className={`header__navigation ${isMobileNavigationOpen ? 'hidden' : ''}`}>
                    <div
                        className="header__navigation__mobile-navigation"
                        onClick={openMobileNavigation}
                        data-testid="mobile-nav-button"
                    >
                        <i className="fa-solid fa-ellipsis"></i>
                    </div>
                    <div className="header__navigation__logo">
                        <img src="/images/other/logo.png" alt="Logo" data-testid="desktop-logo" />
                    </div>
                    <nav className="header__navigation__links" data-testid="desktop-links">
                        <a href="/" data-testid="desktop-home-link">Home</a>
                        <a href="/history">Our History</a>
                        <a href="/shop">Store</a>
                    </nav>
                    <div className="header__navigation__icons">
                        <i
                            className="fa-solid fa-cart-shopping cart__open-button"
                            onClick={openCart}
                            data-testid="cart-button"
                        ></i>
                    </div>
                </div>

                <div className={`header__mobile-navigation ${isMobileNavigationOpen ? 'open' : ''}`} data-testid="mobile-navigation">
                    <div className="header__mobile-navigation__logo">
                        <img src="/images/other/logo.png" alt="Logo" data-testid="mobile-logo" />
                    </div>
                    <div className="header__mobile-navigation__links" data-testid="mobile-links">
                        <a href="/" data-testid="mobile-home-link" onClick={closeMobileNavigation}>
                            Home
                        </a>
                        <a href="/history" onClick={closeMobileNavigation}>
                            Our History
                        </a>
                        <a href="/shop" onClick={closeMobileNavigation}>
                            Store
                        </a>
                    </div>
                    <div
                        className="header__mobile-navigation__exit"
                        onClick={closeMobileNavigation}
                        data-testid="close-mobile-nav"
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>
                {isMobileNavigationOpen && (
                    <div className="blackout" onClick={closeMobileNavigation} data-testid="blackout"></div>
                )}
            </header>
        </>
    );
};

export default Header;
