import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LocationPage from '../pages/LocationPage';

describe('LocationPage Component', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  test('renders the LocationPage with header and footer', () => {
    renderWithRouter(<LocationPage />);
    expect(screen.getByRole('banner')).toBeInTheDocument(); 
    expect(screen.getByText(/The Pulse 2025, All rights reserved/i)).toBeInTheDocument(); 

    expect(
      screen.getByText('Our Location', {
        selector: '.page-banner__title__nav-definition p',
      })
    ).toBeInTheDocument();
    expect(
      screen.getByText('Find our physical store', {
        selector: '.page-banner__title__text p',
      })
    ).toBeInTheDocument();
  });

  test('renders the Google Maps iframe', () => {
    renderWithRouter(<LocationPage />);

    const mapIframe = screen.getByTitle('Google Maps Location');
    expect(mapIframe).toBeInTheDocument();
    expect(mapIframe).toHaveAttribute(
      'src',
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.678150321841!2d-73.98976828459869!3d40.75288207932738!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259af18e50a1b%3A0x63f92c8d08f2466a!2s123%20Fashion%20Ave%2C%20New%20York%2C%20NY%2010001%2C%20USA!5e0!3m2!1sen!2sus!4v1692810767468!5m2!1sen!2sus'
    );
    expect(mapIframe).toHaveAttribute('width', '50%');
    expect(mapIframe).toHaveAttribute('height', '400');
  });

  test('renders the store address and opening hours', () => {
    renderWithRouter(<LocationPage />);
    expect(screen.getByText('Store Address')).toBeInTheDocument();
    expect(screen.getByText('123 Fashion Avenue')).toBeInTheDocument();
    expect(screen.getByText('United States, New York, NY 10001')).toBeInTheDocument();
    expect(screen.getByText('Opening Hours')).toBeInTheDocument();
    expect(screen.getByText('Monday - Friday: 9:00 AM - 9:00 PM')).toBeInTheDocument();
    expect(screen.getByText('Saturday: 10:00 AM - 8:00 PM')).toBeInTheDocument();
    expect(screen.getByText('Sunday: 11:00 AM - 6:00 PM')).toBeInTheDocument();
  });
});
