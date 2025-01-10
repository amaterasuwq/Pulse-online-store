import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../components/Footer';

describe('Footer Component', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  test('renders social media links with correct attributes', () => {
    renderWithRouter(<Footer />);

    const instagramLink = screen.getByRole('link', { name: /instagram/i });
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/');
    expect(instagramLink).toHaveAttribute('target', '_blank');
    expect(instagramLink).toHaveAttribute('rel', 'noreferrer');

    const telegramLink = screen.getByRole('link', { name: /telegram/i });
    expect(telegramLink).toHaveAttribute('href', 'https://web.telegram.org/k/');
    expect(telegramLink).toHaveAttribute('target', '_blank');
    expect(telegramLink).toHaveAttribute('rel', 'noreferrer');

    const twitterLink = screen.getByRole('link', { name: /twitter/i });
    expect(twitterLink).toHaveAttribute('href', 'https://x.com/?lang=en-');
    expect(twitterLink).toHaveAttribute('target', '_blank');
    expect(twitterLink).toHaveAttribute('rel', 'noreferrer');
  });

  test('renders store-related links correctly', () => {
    renderWithRouter(<Footer />);

    const locationLink = screen.getByRole('link', { name: /location/i });
    expect(locationLink).toHaveAttribute('href', '/location');

    const contactUsLink = screen.getByRole('link', { name: /contact us/i });
    expect(contactUsLink).toHaveAttribute('href', '/contact-us');

    const storeDetailsLink = screen.getByRole('link', { name: /store details/i });
    expect(storeDetailsLink).toHaveAttribute('href', '/store-details');
  });

  test('renders product-related links correctly', () => {
    renderWithRouter(<Footer />);

    const returnProductLink = screen.getByRole('link', { name: /return product/i });
    expect(returnProductLink).toHaveAttribute('href', '/return-product');

    const shippingLink = screen.getByRole('link', { name: /shipping/i });
    expect(shippingLink).toHaveAttribute('href', '/shipping');
  });

  test('renders payment-related links correctly', () => {
    renderWithRouter(<Footer />);

    const paymentOptionsLink = screen.getByRole('link', { name: /payment options/i });
    expect(paymentOptionsLink).toHaveAttribute('href', '/payment-options');
  });

  test('renders privacy-related links correctly', () => {
    renderWithRouter(<Footer />);

    const privacyPolicyLink = screen.getByRole('link', { name: /privacy policy/i });
    expect(privacyPolicyLink).toHaveAttribute('href', '/privacy-policy');

    const termsLink = screen.getByRole('link', { name: /terms and conditions/i });
    expect(termsLink).toHaveAttribute('href', '/terms-and-conditions');

    const cookiePolicyLink = screen.getByRole('link', { name: /cookie policy/i });
    expect(cookiePolicyLink).toHaveAttribute('href', '/cookie-policy');
  });

  test('renders the copyright message', () => {
    renderWithRouter(<Footer />);

    expect(screen.getByText(/The Pulse 2025, All rights reserved/i)).toBeInTheDocument();
  });
});
