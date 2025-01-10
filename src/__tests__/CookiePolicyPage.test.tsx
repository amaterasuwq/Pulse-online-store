import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CookiePolicyPage from '../pages/CookiePolicyPage';

describe('CookiePolicyPage Component', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  test('renders the Cookie Policy page with header and footer', () => {
    renderWithRouter(<CookiePolicyPage />);
    expect(screen.getByRole('banner')).toBeInTheDocument(); 
    expect(screen.getByText(/The Pulse 2025, All rights reserved/i)).toBeInTheDocument(); 
  
    const titles = screen.getAllByText('Cookie Policy');
    expect(titles).toHaveLength(2);
  
    expect(
      screen.getByText('Cookie Policy', { selector: '.page-banner__title__nav-definition p' })
    ).toBeInTheDocument();
  
    expect(
      screen.getByText(/Understand how we use cookies to improve your experience/i)
    ).toBeInTheDocument();
  });

  test('renders sections explaining cookies and their types', () => {
    renderWithRouter(<CookiePolicyPage />);
    expect(screen.getByText('What Are Cookies?')).toBeInTheDocument();
    expect(
      screen.getByText(
        /Cookies are small text files that are stored on your device when you visit a website/i
      )
    ).toBeInTheDocument();

    expect(screen.getByText('Types of Cookies We Use')).toBeInTheDocument();
    expect(screen.getByText('Essential Cookies:')).toBeInTheDocument();
    expect(screen.getByText('Performance Cookies:')).toBeInTheDocument();
    expect(screen.getByText('Functionality Cookies:')).toBeInTheDocument();
    expect(screen.getByText('Targeting/Advertising Cookies:')).toBeInTheDocument();
  });

  test('renders "How We Use Cookies" section', () => {
    renderWithRouter(<CookiePolicyPage/>);

    expect(screen.getByText('How We Use Cookies')).toBeInTheDocument();
    expect(screen.getByText('Recognize returning visitors.')).toBeInTheDocument();
    expect(screen.getByText('Analyze site performance and usage.')).toBeInTheDocument();
    expect(screen.getByText('Provide personalized content and ads.')).toBeInTheDocument();
    expect(screen.getByText('Enhance website functionality and usability.')).toBeInTheDocument();
  });

  test('renders "Third-Party Cookies" section', () => {
    renderWithRouter(<CookiePolicyPage/>);

    expect(screen.getByText('Third-Party Cookies')).toBeInTheDocument();
    expect(
      screen.getByText(/We may allow third-party services to place cookies on your device/i)
    ).toBeInTheDocument();
  });

  test('renders "Managing Cookies" section with browser links', () => {
    renderWithRouter(<CookiePolicyPage />);
  
    const managingCookiesSection = screen.getByText('Managing Cookies').closest('section');
    expect(managingCookiesSection).toBeInTheDocument();
  
    const links = within(managingCookiesSection!).getAllByRole('link');
    expect(links).toHaveLength(4);
  
    expect(links[0]).toHaveAttribute(
      'href',
      'https://support.google.com/accounts/answer/61416'
    );
    expect(links[1]).toHaveAttribute(
      'href',
      'https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences'
    );
    expect(links[2]).toHaveAttribute(
      'href',
      'https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09'
    );
    expect(links[3]).toHaveAttribute('href', 'https://support.apple.com/en-us/HT201265');
  });

  test('renders "Updates to This Policy" section', () => {
    renderWithRouter(<CookiePolicyPage />);

    expect(screen.getByText('Updates to This Policy')).toBeInTheDocument();
    expect(
      screen.getByText(
        /We may update this Cookie Policy from time to time. Any changes will be posted on this page/i
      )
    ).toBeInTheDocument();
  });
});
