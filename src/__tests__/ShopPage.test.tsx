import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import ShopPage from '../pages/ShopPage';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

describe('ShopPage Component', () => {
    const mockProducts = [
        { id: 1, name: 'T-Shirt', price: '$20', type: 'T-shirts', image: '/images/tshirt.jpg' },
        { id: 2, name: 'Jeans', price: '$50', type: 'Pants', image: '/images/jeans.jpg' },
        { id: 3, name: 'Sneakers', price: '$80', type: 'Shoes', image: '/images/sneakers.jpg' },
    ];

    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockProducts),
            })
        ) as jest.Mock;
        localStorage.clear();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const renderWithRouter = (ui: React.ReactElement) => {
        return render(<BrowserRouter>{ui}</BrowserRouter>);
    };

    it('renders ShopPage with header and footer', async () => {
        await act(async () => {
            renderWithRouter(<ShopPage />);
        });

        expect(screen.getByTestId('desktop-links')).toBeInTheDocument();
        expect(screen.getByText('The Pulse 2025, All rights reserved')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('T-Shirt')).toBeInTheDocument();
        });
    });
});
