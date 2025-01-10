import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ContactUsPage from '../pages/ContactUsPage';

describe('ContactUsPage Component', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  test('renders the Contact Us page with header and footer', () => {
    renderWithRouter(<ContactUsPage />);

    expect(screen.getByRole('banner')).toBeInTheDocument(); 
    expect(screen.getByText(/The Pulse 2025, All rights reserved/i)).toBeInTheDocument(); 
    const pageBannerTitle = screen.getByText('Contact Us', { selector: '.page-banner__title__nav-definition p' });
    expect(pageBannerTitle).toBeInTheDocument();
    expect(screen.getByText(/Have questions or need help/i)).toBeInTheDocument();
  });

  test('renders contact information', () => {
    renderWithRouter(<ContactUsPage />);

    expect(screen.getByText(/support@thepulse.com/i)).toBeInTheDocument();
    expect(screen.getByText(/\+1 \(123\) 456-7890/i)).toBeInTheDocument();

    const instagramLinks = screen.getAllByRole('link', { name: /instagram/i });
    expect(instagramLinks[0]).toHaveAttribute('href', 'https://www.instagram.com/');
    expect(instagramLinks[0]).toHaveAttribute('target', '_blank');

    const twitterLinks = screen.getAllByRole('link', { name: /twitter/i });
    expect(twitterLinks[0]).toHaveAttribute('href', 'https://www.twitter.com/');
    expect(twitterLinks[0]).toHaveAttribute('target', '_blank');
    
    const facebookLink = screen.getByRole('link', { name: /facebook/i });
    expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/');
    expect(facebookLink).toHaveAttribute('target', '_blank');
  });

  test('validates form submission and shows success message', () => {
    renderWithRouter(<ContactUsPage />);

    fireEvent.change(screen.getByPlaceholderText('Enter your name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your email'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Type your message here...'), {
      target: { value: 'Hello, this is a test message.' },
    });

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    expect(
      screen.getByText('Your message has been sent successfully!')
    ).toBeInTheDocument();
  });

  test('displays validation errors for empty fields', () => {
    renderWithRouter(<ContactUsPage />);

    const submitButton = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitButton);

    expect(screen.getByPlaceholderText('Enter your name')).toBeInvalid();
    expect(screen.getByPlaceholderText('Enter your email')).toBeInvalid();
    expect(screen.getByPlaceholderText('Type your message here...')).toBeInvalid();
  });
});
