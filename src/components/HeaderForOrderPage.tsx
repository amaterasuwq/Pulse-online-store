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
            <Cart isCartOpen={isCartOpen} closeCart={closeCart} />

            <header className="header">
                <div className={`header__navigation ${isMobileNavigationOpen ? 'hidden' : ''}`}>
                    <div className="header__navigation__mobile-navigation" onClick={openMobileNavigation}>
                        <i className="fa-solid fa-ellipsis"></i>
                    </div>
                    <div className="header__navigation__logo">
                        <img src="/images/other/logo.png" alt="Logo" />
                    </div>
                    <nav className="header__navigation__links">
                        <a href="/">Home</a>
                        <a href="/history">Our History</a>
                        <a href="/shop">Store</a>
                    </nav>
                    <div className="header__navigation__icons" style={{ visibility: 'hidden' }}>
                        <i className="fa-solid fa-cart-shopping cart__open-button" onClick={openCart}></i>
                    </div>
                </div>

                <div className={`header__mobile-navigation ${isMobileNavigationOpen ? 'open' : ''}`}>
                    <div className="header__mobile-navigation__logo">
                        <img src="/images/other/logo.png" alt="Logo" />
                    </div>
                    <div className="header__mobile-navigation__links">
                        <a href="/" onClick={closeMobileNavigation}>
                            Home
                        </a>
                        <a href="/history" onClick={closeMobileNavigation}>
                            Our History
                        </a>
                        <a href="/shop" onClick={closeMobileNavigation}>
                            Store
                        </a>
                    </div>
                    <div className="header__mobile-navigation__exit" onClick={closeMobileNavigation}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </div>

                {isMobileNavigationOpen && (
                    <div className="blackout" onClick={closeMobileNavigation}></div>
                )}
            </header>
        </>
    );
};

export default Header;
