import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ShopPage from './pages/ShopPage';
import HistoryPage from './pages/HistoryPage';
import LocationPage from './pages/LocationPage';
import ContactUsPage from './pages/ContactUsPage';
import StoreDetailsPage from './pages/StoreDetailsPage';
import ReturnProductPage from './pages/ReturnProductPage';
import ShippingPage from './pages/ShippingPage';
import PaymentOptionsPage from './pages/PaymentOptionsPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import CookiePolicyPage from './pages/CookiePolicyPage';
import OrderPage from './pages/OrderPage';
import OrderConfirmation from './pages/OrderConfirmation';

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/shop" element={<ShopPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/location" element={<LocationPage />} />
                <Route path="/contact-us" element={<ContactUsPage />} />
                <Route path="/store-details" element={<StoreDetailsPage />} />
                <Route path="/return-product" element={<ReturnProductPage />} />
                <Route path="/shipping" element={<ShippingPage />} />
                <Route path="/payment-options" element={<PaymentOptionsPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
                <Route path="/cookie-policy" element={<CookiePolicyPage />} />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/confirmation" element={<OrderConfirmation />} />
            </Routes>
        </>
    );
}

export default App;
