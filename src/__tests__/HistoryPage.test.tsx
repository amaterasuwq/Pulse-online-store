import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HistoryPage from '../pages/HistoryPage';

describe('HistoryPage Component', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  test('renders the HistoryPage with header and footer', () => {
    renderWithRouter(<HistoryPage />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText(/The Pulse 2025, All rights reserved/i)).toBeInTheDocument();

    const bannerTitle = screen.getByText('Our History', {
      selector: '.page-banner__title__nav-definition p',
    });
    expect(bannerTitle).toBeInTheDocument();

    expect(screen.getByText('History of The Pulse')).toBeInTheDocument();
  });

  test('renders the first history section', () => {
    renderWithRouter(<HistoryPage />);

    expect(screen.getByText('The Pulse: A Vision of Fashion Innovation')).toBeInTheDocument();
    expect(
      screen.getByText(
        /The Pulse was born out of a passion for bringing bold, unique fashion to a global audience/i
      )
    ).toBeInTheDocument();

    const firstImage = screen.getByAltText('History Image 1');
    expect(firstImage).toBeInTheDocument();
    expect(firstImage).toHaveAttribute('src', '/images/history-page/history-1.jpg');
  });

  test('renders the second history section', () => {
    renderWithRouter(<HistoryPage />);

    expect(screen.getByText('From Dream to Reality: The Evolution of The Pulse')).toBeInTheDocument();
    expect(
      screen.getByText(
        /As The Pulse grew, so did our commitment to quality and sustainability/i
      )
    ).toBeInTheDocument();

    const secondImage = screen.getByAltText('History Image 2');
    expect(secondImage).toBeInTheDocument();
    expect(secondImage).toHaveAttribute('src', '/images/history-page/history-2.jpg');
  });
});
