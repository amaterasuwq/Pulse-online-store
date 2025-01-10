import React, { useState, useEffect } from 'react';
import Header from '../components/HeaderForOrderPage';
import Footer from '../components/Footer';
import '../styles/compiled-css/order-page.css';

type FormData = {
    name: string;
    surname: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    address: string;
    flatNumber: string;
    postalCode: string;
};

type ErrorMessages = Partial<FormData & { terms: string; privacy: string }>;

const OrderPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isTermsChecked, setIsTermsChecked] = useState(false);
    const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
    const [errors, setErrors] = useState<ErrorMessages>({});
    const [formData, setFormData] = useState<FormData>({
        name: '',
        surname: '',
        email: '',
        phone: '',
        country: '',
        city: '',
        address: '',
        flatNumber: '',
        postalCode: '',
    });

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            const items = JSON.parse(storedCart);
            setCartItems(items);

            const total = items.reduce(
                (sum: number, item: any) => sum + parseFloat(item.price.replace('$', '')) * item.quantity,
                0
            );
            setTotalPrice(total);
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: '' }));
    };

    const handleConfirm = async () => {
        const newErrors: ErrorMessages = {};
    
        const nameValidation = /^[a-zA-Z\s]{2,50}$/;
        if (!formData.name.trim() || !nameValidation.test(formData.name)) {
            newErrors.name = formData.name ? 'Invalid name (2-50 letters only)' : '*Required';
        }
        if (!formData.surname.trim() || !nameValidation.test(formData.surname)) {
            newErrors.surname = formData.surname ? 'Invalid surname (2-50 letters only)' : '*Required';
        }
        if (!formData.country.trim() || !nameValidation.test(formData.country)) {
            newErrors.country = formData.country ? 'Invalid country (2-50 letters only)' : '*Required';
        }
        if (!formData.city.trim() || !nameValidation.test(formData.city)) {
            newErrors.city = formData.city ? 'Invalid city (2-50 letters only)' : '*Required';
        }

        // Validate email
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = formData.email ? 'Invalid email format' : '*Required';
        }

        // Validate phone number
        if (!formData.phone.trim() || !/^\+?[0-9]{7,15}$/.test(formData.phone)) {
            newErrors.phone = formData.phone ? 'Invalid phone number' : '*Required';
        }

        // Validate postal code
        if (!formData.postalCode.trim() || !/^[a-zA-Z0-9\s-]{4,10}$/.test(formData.postalCode)) {
            newErrors.postalCode = formData.postalCode ? 'Invalid postal code' : '*Required';
        }

        // Validate agreements
        if (!isTermsChecked) newErrors.terms = '*Required';
        if (!isPrivacyChecked) newErrors.privacy = '*Required';

        setErrors(newErrors);
    
        if (Object.keys(newErrors).length === 0) {
            try {
                const lineItems = cartItems.map((item) => ({
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: item.name,
                        },
                        unit_amount: parseFloat(item.price.replace('$', '')) * 100,
                    },
                    quantity: item.quantity,
                }));
        
                const stripeResponse = await fetch('http://localhost:3000/checkout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ line_items: lineItems }),
                });
        
                const stripeData = await stripeResponse.json();
        
                if (!stripeData.url) {
                    console.error('Failed to create checkout session');
                    return;
                }

                window.location.href = stripeData.url;
            } catch (error) {
                console.error('Error during checkout or email confirmation:', error);
            }
        } else {
            setErrors(newErrors);
        }   
    };
    
    return (
        <div className="container">
            <div className="blackout"></div>
            <Header/>
            <div className="page-banner__title">
                <div className="page-banner__title__nav-definition">
                    <p>Order Page</p>
                </div>
                <div className="page-banner__title__text">
                    <p>Review your order, provide delivery information, and confirm.</p>
                </div>
            </div>

            <div className="order-page">
                <div className="order-page__items">
                    <h2>Items in Your Cart</h2>
                    <div className="order-page__items__container">
                        {cartItems.length === 0 ? (
                            <p>Your cart is empty.</p>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.name} className="order-page__item">
                                    <img src={item.image} alt={item.name} />
                                    <div>
                                        <p><strong>{item.name}</strong></p>
                                        <p>Quantity: {item.quantity}</p>
                                        <p>Price: <strong>{item.price}</strong></p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="order-page__total">
                    <p>Total Price: ${totalPrice.toFixed(2)}</p>
                </div>

                <div className="order-page__delivery">
                    <h2>Delivery Information</h2>
                    <form>
                        {['name', 'surname', 'email', 'phone', 'country', 'city', 'address', 'postalCode'].map(
                            (field) => (
                                <div key={field} className="form-group">
                                    <input
                                        type={field === 'email' ? 'email' : 'text'}
                                        name={field}
                                        placeholder={field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                                        value={formData[field as keyof FormData]}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    {errors[field as keyof FormData] && (
                                        <p className="form-error">{errors[field as keyof FormData]}</p>
                                    )}
                                </div>
                            )
                        )}
                    </form>
                </div>

                <div className="order-page__agreements">
                    <div className="order-page__agreements__checkbox">
                        <input
                            type="checkbox"
                            id="terms"
                            checked={isTermsChecked}
                            onChange={(e) => setIsTermsChecked(e.target.checked)}
                        />
                        <label htmlFor="terms">
                            I agree to the <a href="/terms-and-conditions">Terms and Conditions</a>.
                        </label>
                        {errors.terms && <p className="form-error">{errors.terms}</p>}
                    </div>
                    <div className="order-page__agreements__checkbox">
                        <input
                            type="checkbox"
                            id="privacy"
                            checked={isPrivacyChecked}
                            onChange={(e) => setIsPrivacyChecked(e.target.checked)}
                        />
                        <label htmlFor="privacy">
                            I agree to the <a href="/privacy-policy">Privacy Policy</a>.
                        </label>
                        {errors.privacy && <p className="form-error">{errors.privacy}</p>}
                    </div>
                </div>

                <div className="order-page__confirm">
                    <button onClick={handleConfirm}>Confirm & Pay</button>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default OrderPage;
