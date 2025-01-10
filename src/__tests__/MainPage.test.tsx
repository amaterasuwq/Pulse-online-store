import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('MainPage Component', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  beforeEach(() => {
    localStorage.clear(); 
    jest.clearAllMocks();
  });

  test('renders the MainPage with header and footer', () => {
    renderWithRouter(<MainPage />);
    expect(screen.getByRole('banner')).toBeInTheDocument(); 
    expect(screen.getByText(/The Pulse 2025, All rights reserved/i)).toBeInTheDocument();
  });

  test('navigates to all categories when "All Categories" button is clicked', () => {
    const navigateMock = jest.fn();
    require('react-router-dom').useNavigate.mockImplementation(() => navigateMock);

    renderWithRouter(<MainPage />);

    const allCategoriesButton = screen.getByText('All Categories');
    fireEvent.click(allCategoriesButton);

    expect(navigateMock).toHaveBeenCalledWith('/shop');
  });

  test('handles newsletter subscription correctly', () => {
    renderWithRouter(<MainPage />);

    const emailInput = screen.getByPlaceholderText('Enter Email');
    const subscribeButton = screen.getByText('Subscribe');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(subscribeButton);
    expect(screen.getByText('Please enter a valid email address!')).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(subscribeButton);
    expect(screen.getByText('Subscribed successfully!')).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(subscribeButton);
    expect(screen.getByText("You're already subscribed!")).toBeInTheDocument();
  });

  test('displays and hides subscription messages after 3 seconds', () => {
    jest.useFakeTimers();

    renderWithRouter(<MainPage />);

    const emailInput = screen.getByPlaceholderText('Enter Email');
    const subscribeButton = screen.getByText('Subscribe');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(subscribeButton);
    expect(screen.getByText('Subscribed successfully!')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.queryByText('Subscribed successfully!')).not.toBeInTheDocument();
    jest.useRealTimers();
  });
});
