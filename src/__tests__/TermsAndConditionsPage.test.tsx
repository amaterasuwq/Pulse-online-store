import React from 'react';
import { render, screen } from '@testing-library/react';
import TermsAndConditionsPage from '../pages/TermsAndConditionsPage';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';

describe('TermsAndConditionsPage Component', () => {
    const renderWithRouter = (ui: React.ReactElement) => {
        return render(<BrowserRouter>{ui}</BrowserRouter>);
    };

    it('renders the header and footer', () => {
        renderWithRouter(<TermsAndConditionsPage />);
        expect(screen.getByTestId('desktop-links')).toBeInTheDocument();
        expect(screen.getByText('The Pulse 2025, All rights reserved')).toBeInTheDocument();
    });

    it('displays the page title and description', () => {
        renderWithRouter(<TermsAndConditionsPage />);

        const pageTitle = screen.getByText((content, element) => {
            return (
                element?.tagName.toLowerCase() === 'p' &&
                content === 'Terms and Conditions'
            );
        });
        expect(pageTitle).toBeInTheDocument();

        expect(screen.getByText(/please read our terms carefully/i)).toBeInTheDocument();
    });

    it('renders all sections with appropriate headings and content', () => {
        renderWithRouter(<TermsAndConditionsPage />);

        const sections = [
            'Introduction',
            'Eligibility',
            'Orders and Payments',
            'Shipping and Delivery',
            'Returns and Refunds',
            'User Conduct',
            'Intellectual Property',
            'Limitation of Liability',
            'Amendments',
            'Governing Law',
        ];

        sections.forEach((section) => {
            expect(screen.getByRole('heading', { name: section })).toBeInTheDocument();
        });
    });

    it('renders the Returns and Refunds section with a link to Return Product policy', () => {
        renderWithRouter(<TermsAndConditionsPage />);

        const returnProductLinks = screen.getAllByText('Return Product');
        const returnProductLink = returnProductLinks.find(link =>
            link.getAttribute('href') === '/return-product'
        );

        expect(returnProductLink).toBeInTheDocument();
        expect(returnProductLink).toHaveAttribute('href', '/return-product');
    });

    it('renders the User Conduct section with all bullet points', () => {
        renderWithRouter(<TermsAndConditionsPage />);

        const conductPoints = [
            'You agree not to use our website for any unlawful or harmful purposes.',
            'You must not engage in activities that disrupt or damage the website, its services, or its reputation.',
            'We reserve the right to terminate or suspend your access if you violate these terms or applicable laws.',
        ];

        conductPoints.forEach((point) => {
            expect(screen.getByText(point)).toBeInTheDocument();
        });
    });

    it('renders all other sections with proper content', () => {
        renderWithRouter(<TermsAndConditionsPage />);

        expect(
            screen.getByText(/all content on this website, including images, text, and logos/i)
        ).toBeInTheDocument();
        expect(
            screen.getByText(/the pulse shall not be held liable for any direct, indirect, or consequential damages/i)
        ).toBeInTheDocument();
        expect(
            screen.getByText(/we reserve the right to modify these terms and conditions at any time/i)
        ).toBeInTheDocument();
        expect(
            screen.getByText(/these terms and conditions shall be governed by the laws of united states/i)
        ).toBeInTheDocument();
    });
});
