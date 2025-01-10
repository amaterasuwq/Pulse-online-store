import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import OrderSuccess from '../pages/OrderConfirmation';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('OrderSuccess Component', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the OrderSuccess page with all elements', () => {
    renderWithRouter(<OrderSuccess />);

    const successImage = screen.getByAltText('Logo');
    expect(successImage).toBeInTheDocument();
    expect(successImage).toHaveAttribute('src', '/images/other/succsessful-payment.png');

    expect(screen.getByText('Payment Successful!')).toBeInTheDocument();
    expect(
      screen.getByText('Thank you for your payment. Your order has been placed successfully.')
    ).toBeInTheDocument();
    expect(screen.getByText('We sent all order details to your email.')).toBeInTheDocument();

    const goHomeButton = screen.getByRole('button', { name: 'Go to Main Page' });
    expect(goHomeButton).toBeInTheDocument();
  });

  test('navigates to the main page when the button is clicked', () => {
    const navigateMock = jest.fn();
    require('react-router-dom').useNavigate.mockImplementation(() => navigateMock);

    renderWithRouter(<OrderSuccess />);

    const goHomeButton = screen.getByRole('button', { name: 'Go to Main Page' });
    fireEvent.click(goHomeButton);

    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});
