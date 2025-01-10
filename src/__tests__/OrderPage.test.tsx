import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import OrderPage from '../pages/OrderPage';

describe('OrderPage Component', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  beforeEach(() => {
    localStorage.clear();

    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: '' },
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders OrderPage with header, footer, and empty cart message', () => {
    renderWithRouter(<OrderPage />);

    expect(screen.getByRole('banner')).toBeInTheDocument();

    expect(
      screen.getByText(/The Pulse 2025, All rights reserved/i)
    ).toBeInTheDocument();

    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
    expect(screen.getByText('Total Price: $0.00')).toBeInTheDocument();
  });

  test('displays error messages for invalid or missing input fields', () => {
    renderWithRouter(<OrderPage />);

    const confirmButton = screen.getByRole('button', { name: 'Confirm & Pay' });
    fireEvent.click(confirmButton);
    const requiredErrors = screen.getAllByText('*Required');
    expect(requiredErrors).toHaveLength(9);
  });

  test('renders cart items from localStorage', () => {
    const cartItems = [
      { name: 'Item 1', quantity: 2, price: '$10.00', image: '/images/item1.jpg' },
      { name: 'Item 2', quantity: 1, price: '$20.00', image: '/images/item2.jpg' },
    ];

    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(
      JSON.stringify(cartItems)
    );

    renderWithRouter(<OrderPage />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 2')).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => element?.textContent === 'Price: $10.00')
    ).toBeInTheDocument();

    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('Quantity: 1')).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => element?.textContent === 'Price: $20.00')
    ).toBeInTheDocument();

    expect(screen.getByText('Total Price: $40.00')).toBeInTheDocument();
  });

  test('navigates to Stripe checkout on valid form submission', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(
      JSON.stringify([{ name: 'Item 1', quantity: 1, price: '$10.00', image: '/image.jpg' }])
    );

    global.fetch = jest.fn().mockResolvedValue({
      json: async () => ({ url: 'https://mocked-checkout.stripe.url' }),
    }) as jest.Mock;

    renderWithRouter(<OrderPage />);

    fireEvent.change(screen.getByPlaceholderText('Name'), {
      target: { value: 'Mykhailo' },
    });
    fireEvent.change(screen.getByPlaceholderText('Surname'), {
      target: { value: 'Chuprun' },
    });
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'myhkailochuprun@gmail.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Phone'), {
      target: { value: '+1234567890' },
    });
    fireEvent.change(screen.getByPlaceholderText('Country'), {
      target: { value: 'USA' },
    });
    fireEvent.change(screen.getByPlaceholderText('City'), {
      target: { value: 'New York' },
    });
    fireEvent.change(screen.getByPlaceholderText('Address'), {
      target: { value: '123 Fashion Ave' },
    });
    fireEvent.change(screen.getByPlaceholderText('Postal Code'), {
      target: { value: '10001' },
    });

    fireEvent.click(
      screen.getByLabelText(/I agree to the Terms and Conditions/i)
    );
    fireEvent.click(screen.getByLabelText(/I agree to the Privacy Policy/i));
    const confirmButton = screen.getByRole('button', { name: 'Confirm & Pay' });
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(window.location.href).toBe('https://mocked-checkout.stripe.url');
    });
  });
});
