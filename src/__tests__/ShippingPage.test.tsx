import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import ShippingPage from '../pages/ShippingPage';

describe('ShippingPage Component', () => {
    const renderWithRouter = (ui: React.ReactElement) => {
        return render(<Router>{ui}</Router>);
    };

    test('renders the Shipping page with header and footer', () => {
        renderWithRouter(<ShippingPage />);
        expect(screen.getByText('Shipping', { selector: 'p' })).toBeInTheDocument();
        expect(
            screen.getByText('Learn about our shipping options and track your order status.')
        ).toBeInTheDocument();

        expect(screen.getByText('The Pulse 2025, All rights reserved')).toBeInTheDocument();
        expect(screen.getByText('Location')).toHaveAttribute('href', '/location');
    });

    test('renders the shipping information section', () => {
        renderWithRouter(<ShippingPage />);
        expect(screen.getByText('Shipping Information', { selector: 'h2' })).toBeInTheDocument();
        expect(
            screen.getByText(/We strive to deliver your orders as quickly and efficiently as possible./i)
        ).toBeInTheDocument();
        expect(screen.getByText('Standard Shipping:')).toBeInTheDocument();
        expect(screen.getByText('Express Shipping:')).toBeInTheDocument();
        expect(screen.getByText('Overnight Shipping:')).toBeInTheDocument();
    });

    test('renders the tracking form with inputs and button', () => {
        renderWithRouter(<ShippingPage />);
        expect(screen.getByLabelText('Enter Tracking Number')).toBeInTheDocument();
        expect(screen.getByText('Track Order')).toBeInTheDocument();
    });

    test('displays an error when tracking number contains invalid characters', () => {
        renderWithRouter(<ShippingPage />);

        const input = screen.getByLabelText('Enter Tracking Number') as HTMLInputElement;
        const submitButton = screen.getByText('Track Order');

        fireEvent.change(input, { target: { value: '123AB' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('Tracking number should only contain numbers.')).toBeInTheDocument();
    });

    test('displays an error when tracking number is too short', () => {
        renderWithRouter(<ShippingPage />);

        const input = screen.getByLabelText('Enter Tracking Number') as HTMLInputElement;
        const submitButton = screen.getByText('Track Order');

        fireEvent.change(input, { target: { value: '123' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('Tracking number must be at least 5 digits long.')).toBeInTheDocument();
    });

    test('displays an error when tracking number is too long', () => {
        renderWithRouter(<ShippingPage />);

        const input = screen.getByLabelText('Enter Tracking Number') as HTMLInputElement;
        const submitButton = screen.getByText('Track Order');

        fireEvent.change(input, { target: { value: '12345678901' } });
        fireEvent.click(submitButton);

        expect(screen.getByText('Tracking number cannot exceed 10 digits.')).toBeInTheDocument();
    });

    test('displays tracking information for a valid tracking number', () => {
        renderWithRouter(<ShippingPage />);
    
        const input = screen.getByLabelText('Enter Tracking Number') as HTMLInputElement;
        const submitButton = screen.getByText('Track Order');
    
        fireEvent.change(input, { target: { value: '12345' } });
        fireEvent.click(submitButton);

        expect(
            screen.getByText((content, element) => {
                return (
                    content.includes('Tracking information for') &&
                    element?.textContent === 'Tracking information for 12345:'
                );
            })
        ).toBeInTheDocument();
    
        expect(screen.getByText('Status: In Transit')).toBeInTheDocument();
        expect(screen.getByText('Estimated Delivery: 3 days')).toBeInTheDocument();
    });
});
