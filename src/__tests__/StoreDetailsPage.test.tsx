import React from 'react';
import { render, screen } from '@testing-library/react';
import StoreDetailsPage from '../pages/StoreDetailsPage';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

describe('StoreDetailsPage Component', () => {
    const renderWithRouter = (ui: React.ReactElement) => {
        return render(<BrowserRouter>{ui}</BrowserRouter>);
    };

    it('renders the page title and description', () => {
        renderWithRouter(<StoreDetailsPage />);

        const titleElement = screen.getAllByText('Store Details').find((el) => el.tagName === 'P');
        expect(titleElement).toBeInTheDocument();

        expect(screen.getByText(/Discover more about our store/i)).toBeInTheDocument();
    });
});
