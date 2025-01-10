import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/compiled-css/main-styles.css';
import '../styles/compiled-css/shop-page.css';
import '../styles/compiled-css/cart.css';

const ShopPage: React.FC = () => {
    const [staff, setStaff] = useState<any[]>([]);
    const [filteredStaff, setFilteredStaff] = useState<any[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [priceRange, setPriceRange] = useState(500);
    const [selectedType, setSelectedType] = useState('All');
    const [cartItems, setCartItems] = useState<any[]>(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();

        const storedMessage = localStorage.getItem('successMessage');
        if (storedMessage) {
            setSuccessMessage(storedMessage);
            localStorage.removeItem('successMessage'); 
        }
    }, []);

    useEffect(() => {
        filterStaff();
    }, [searchTerm, priceRange, selectedType, staff]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('http://localhost:5000/api/staff');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setStaff(data);
            setFilteredStaff(data);
        } catch (error: any) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const filterStaff = () => {
        const filtered = staff.filter((item: any) => {
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesPrice = parseFloat(item.price.replace('$', '')) <= priceRange;
            const matchesType = selectedType === 'All' || item.type === selectedType;
            return matchesSearch && matchesPrice && matchesType;
        });
        setFilteredStaff(filtered);
    };

    const updateRangeBackground = (value: number) => {
        const min = 0;
        const max = 500;
        const percentage = ((value - min) / (max - min)) * 100;
        return `linear-gradient(to right, #191919 ${percentage}%, lightgray ${percentage}%)`;
    };

    const handleAddToCart = (item: any) => {
        const existingItemIndex = cartItems.findIndex(cartItem => cartItem.name === item.name);
        if (existingItemIndex > -1) {
            const updatedCart = [...cartItems];
            updatedCart[existingItemIndex].quantity += 1;
            setCartItems(updatedCart);
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
        localStorage.setItem('last_action', 'addedToCart');
        localStorage.setItem('cartOpen', 'true');
        localStorage.setItem('successMessage', `${item.name} has been added to your cart`);

        window.location.reload();
    };

    const handleCloseMessage = () => {
        setSuccessMessage('');
    };

    return (
        <div className="container">
            <div className="blackout"></div>
            {successMessage && (
                <div className="success-message" data-testid="success-message">
                    <span>{successMessage}</span>
                    <i className="fa-solid fa-xmark cart__exit" onClick={handleCloseMessage} />
                </div>
            )}
            <Header/>
            <div className="page-banner__title">
                <div className="page-banner__title__nav-definition">
                    <p>Store</p>
                </div>
                <div className="page-banner__title__text">
                    <p>Our Products</p>
                </div>
            </div>
            {isLoading ? (
                <div className="loading-indicator">
                    <p>Loading products...</p>
                </div>
            ) : error ? (
                <div className="error-message">
                    <p>Error: {error}</p>
                </div>
            ) : (
                <div className="staff__container">
                    <div className="staff">
                        <div className="staff__filtering-items__container">
                            <div className="staff__filtering">
                                <div className="staff__filtering__search">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </div>
                                <div className="staff__filtering__filter">
                                    <p>Type</p>
                                    {['All', 'T-shirts', 'Pants', 'Shoes', 'Accesories', 'Jackets', 'Backpacks'].map((type) => (
                                        <button
                                            key={type}
                                            id={type.toLowerCase()}
                                            style={{
                                                backgroundColor: selectedType === type ? '#191919' : '#ffffff',
                                                color: selectedType === type ? '#ffffff' : '#191919',
                                            }}
                                            onClick={() => setSelectedType(type)}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                                <div className="staff__filtering__range">
                                    <div className="staff__filtering__range__title">
                                        <span>Price</span>
                                    </div>
                                    <div className="staff__filtering__range__input">
                                        <input
                                            type="range"
                                            min="0"
                                            max="500"
                                            value={priceRange}
                                            onChange={(e) => setPriceRange(Number(e.target.value))}
                                            style={{ background: updateRangeBackground(priceRange) }}
                                        />
                                        <p>{priceRange}$</p>
                                    </div>
                                </div>
                            </div>
                            <div className="staff__items">
                                {filteredStaff.length === 0 ? (
                                    <div className="staff__no-items-message">
                                        <p>No items found</p>
                                    </div>
                                ) : (
                                    filteredStaff.map((item: any) => (
                                        <div className="staff__items__item" key={item.id}>
                                            <div className="staff__items__item__image-button">
                                                <img src={item.image} alt={item.name} />
                                                <button
                                                    className="add-to-cart"
                                                    aria-label={`Add ${item.name} to cart`}
                                                    data-testid={`add-to-cart-${item.id}`}
                                                    onClick={() => handleAddToCart(item)}
                                                >
                                                    <i className="fa-solid fa-plus"></i>
                                                </button>
                                            </div>
                                            <div className="staff__items__item__info">
                                                <div className="staff__items__item__info__name">
                                                    <p>{item.name}</p>
                                                </div>
                                                <div className="staff__items__item__info__price">
                                                    <p>{item.price}</p>
                                                </div>
                                                <div className="staff__items__item__info__type">
                                                    <p>{item.type}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <Footer/>
        </div>
    );
};

export default ShopPage;
