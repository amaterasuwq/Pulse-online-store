import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import ReturnProductPage from '../pages/ReturnProductPage';

describe('ReturnProductPage Component', () => {
    const renderWithRouter = (ui: React.ReactElement) => {
        return render(<Router>{ui}</Router>);
    };

    test('renders the Return Product page with header and footer', () => {
        renderWithRouter(<ReturnProductPage />);
        const pageBanner = screen.getByText('Return Product', { selector: 'p' });
        expect(pageBanner).toBeInTheDocument();
        const bannerDescription = screen.getByText('Hassle-Free Returns for a Better Shopping Experience');
        expect(bannerDescription).toBeInTheDocument();
        expect(screen.getByText('The Pulse 2025, All rights reserved')).toBeInTheDocument();
        expect(screen.getByText('Location')).toHaveAttribute('href', '/location');
    });

    test('renders the return policy section', () => {
        renderWithRouter(<ReturnProductPage />);

        expect(screen.getByText('Return Policy', { selector: 'h2' })).toBeInTheDocument();
        expect(screen.getByText(/We offer a 30-day return policy/i)).toBeInTheDocument();
        expect(
            screen.getByText('Items must be in their original condition, unworn, and with all tags attached.')
        ).toBeInTheDocument();
    });

    test('renders the return form with inputs and submit button', () => {
        renderWithRouter(<ReturnProductPage />);
        expect(screen.getByLabelText('Order ID')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Reason for Return')).toBeInTheDocument();
        expect(screen.getByText('Submit Return Request')).toBeInTheDocument();
    });

    test('displays a success message after submitting the return form', () => {
        renderWithRouter(<ReturnProductPage />);

        const orderIdInput = screen.getByLabelText('Order ID') as HTMLInputElement;
        const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
        const reasonTextarea = screen.getByLabelText('Reason for Return') as HTMLTextAreaElement;
        const submitButton = screen.getByText('Submit Return Request');

        fireEvent.change(orderIdInput, { target: { value: '12345' } });
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(reasonTextarea, { target: { value: 'Wrong size' } });
        fireEvent.click(submitButton);

        expect(
            screen.getByText('Your return request has been submitted successfully. We will contact you shortly!')
        ).toBeInTheDocument();
    });
});
