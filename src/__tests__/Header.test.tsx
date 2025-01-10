import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header';

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  test('renders the header with desktop navigation', () => {
    renderWithRouter(<Header />);
    expect(screen.getByTestId('desktop-logo')).toBeInTheDocument();
    expect(screen.getByTestId('desktop-home-link')).toBeInTheDocument();
    const desktopLinks = screen.getByTestId('desktop-links');
    expect(within(desktopLinks).getByText('Our History')).toBeInTheDocument();
    expect(within(desktopLinks).getByText('Store')).toBeInTheDocument();

    expect(screen.getByTestId('cart-button')).toBeInTheDocument();
  });

  test('opens and closes the cart', () => {
    renderWithRouter(<Header />);
  
    const cartButton = screen.getByTestId('cart-button');
    fireEvent.click(cartButton);
    expect(screen.getByText('Your Cart')).toBeInTheDocument();

    const closeButton = document.querySelector('.fa-solid.fa-xmark.cart__exit');
    expect(closeButton).toBeTruthy();
    fireEvent.click(closeButton!);
    expect(screen.queryByText('Your Cart')).not.toBeInTheDocument();
  });

  test('toggles mobile navigation', () => {
    renderWithRouter(<Header />);

    const mobileNavButton = screen.getByTestId('mobile-nav-button');
    fireEvent.click(mobileNavButton);
    expect(screen.getByTestId('mobile-navigation')).toHaveClass('open');
    expect(screen.getByTestId('blackout')).toBeInTheDocument();

    const closeButton = screen.getByTestId('close-mobile-nav');
    fireEvent.click(closeButton);
    expect(screen.queryByTestId('mobile-navigation')).not.toHaveClass('open');
    expect(screen.queryByTestId('blackout')).not.toBeInTheDocument();
  });

  test('closes mobile navigation when clicking a link', () => {
    renderWithRouter(<Header />);

    const mobileNavButton = screen.getByTestId('mobile-nav-button');
    fireEvent.click(mobileNavButton);

    const homeLink = screen.getByTestId('mobile-home-link');
    fireEvent.click(homeLink);

    expect(screen.queryByTestId('mobile-navigation')).not.toHaveClass('open');
    expect(screen.queryByTestId('blackout')).not.toBeInTheDocument();
  });
});
