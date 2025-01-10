import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import Cart from '../components/Cart';

// Mock useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Cart Component', () => {
  const mockCloseCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders cart with items', () => {
    const cartItems = [
      { name: 'Item 1', price: 10, image: 'img1.jpg', quantity: 2 },
    ];
  
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(JSON.stringify(cartItems));
  
    render(<Cart isCartOpen={true} closeCart={mockCloseCart} />);
  
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText(/20\.00\s?\$/i)).toBeInTheDocument(); 
  });

  test('renders empty cart message', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(null);

    render(<Cart isCartOpen={true} closeCart={mockCloseCart} />);

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  test('updates item quantity correctly', () => {
    const cartItems = [
      { name: 'Item 1', price: 10, image: 'img1.jpg', quantity: 1 },
    ];

    jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(JSON.stringify(cartItems));
    const mockSetItem = jest.spyOn(Storage.prototype, 'setItem');

    const { container } = render(<Cart isCartOpen={true} closeCart={mockCloseCart} />);

    const plusButton = container.querySelector('.fa-solid.fa-plus');
    expect(plusButton).toBeInTheDocument(); // Ensure the button exists
    fireEvent.click(plusButton!); // Simulate quantity increase

    expect(mockSetItem).toHaveBeenCalledWith(
      'cart',
      JSON.stringify([{ name: 'Item 1', price: 10, image: 'img1.jpg', quantity: 2 }])
    );
  });

  test('disables checkout button when cart is empty', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(null);

    render(<Cart isCartOpen={true} closeCart={mockCloseCart} />);
    const checkoutButton = screen.getByRole('button', { name: /checkout/i });

    expect(checkoutButton).toBeDisabled();
  });

  test('navigates to /order when checkout button is clicked', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    const cartItems = [{ name: 'Item 1', price: 10, image: 'img1.jpg', quantity: 1 }];
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValueOnce(JSON.stringify(cartItems));

    render(<Cart isCartOpen={true} closeCart={mockCloseCart} />);

    const checkoutButton = screen.getByRole('button', { name: /checkout/i });
    fireEvent.click(checkoutButton);

    expect(mockNavigate).toHaveBeenCalledWith('/order');
  });
});
