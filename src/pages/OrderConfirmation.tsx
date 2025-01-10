import { useNavigate } from 'react-router-dom';

const OrderSuccess: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="animated-background">
            <div className="confirmed-order">
                <img src="/images/other/succsessful-payment.png" alt="Logo" />
                <h1>Payment Successful!</h1>
                <p>Thank you for your payment. Your order has been placed successfully.</p>
                <p>We sent all order details to your email.</p>
                <button className="go-home-button" onClick={handleGoHome}>
                    Go to Main Page
                </button>
            </div>
        </div>
    );
};

export default OrderSuccess;
