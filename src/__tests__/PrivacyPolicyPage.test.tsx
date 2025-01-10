import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';

describe('PrivacyPolicyPage Component', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  test('renders the Privacy Policy page with header and footer', () => {
    renderWithRouter(<PrivacyPolicyPage />);

    const bannerTitle = screen.getByText('Privacy Policy', { selector: 'p' });
    expect(bannerTitle).toBeInTheDocument();
    const bannerText = screen.getByText(
      'Understand how we collect, use, and protect your information.'
    );
    expect(bannerText).toBeInTheDocument();

    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getByText('The Pulse 2025, All rights reserved')).toBeInTheDocument();
  });

  test('renders the privacy policy sections correctly', () => {
    renderWithRouter(<PrivacyPolicyPage />);

    const sectionHeaders = [
      'What Information We Collect',
      'For What We Use Your Information',
      'Sharing Your Information',
      'How We Protect Your Information',
      'Your Rights',
      'Contact Us',
    ];

    sectionHeaders.forEach((header) => {
      const heading = screen.getByRole('heading', { name: header });
      expect(heading).toBeInTheDocument();
    });
  });

  test('renders all links with correct href attributes', () => {
    renderWithRouter(<PrivacyPolicyPage />);
  
    const contentContactLink = screen.getByRole('link', {
      name: (name) => name.includes('contact us'),
    });
    expect(contentContactLink).toHaveAttribute('href', '/contact-us');

    const footerLinks = screen.getAllByRole('link', {
      name: /privacy policy/i,
    });
    expect(footerLinks[0]).toHaveAttribute('href', '/privacy-policy');
  });

  test('renders list items correctly', () => {
    renderWithRouter(<PrivacyPolicyPage />);

    const listItems = [
      'Personal details like name, email, and contact number when you register or place an order.',
      'Payment information required for processing your transactions, stored securely through encrypted systems.',
      'Behavioral data like browsing patterns and preferences to improve our services and personalization.',
      'To process your orders.',
      'To provide a personalized shopping experience and recommend products.',
      'To improve website functionality and services.',
      'To communicate important updates, promotional offers, and newsletters.',
      'Process payments securely.',
      'Deliver your orders promptly.',
      'Analyze website performance and user experience.',
      'Access your personal data stored with us.',
      'Request corrections to inaccurate or incomplete information.',
      'Request deletion of your personal information under certain conditions.',
    ];

    listItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});
