import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PaymentOptionsPage from '../pages/PaymentOptionsPage';

describe('PaymentOptionsPage Component', () => {
  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<MemoryRouter>{ui}</MemoryRouter>);
  };

  test('renders additional information section', () => {
    renderWithRouter(<PaymentOptionsPage />);

    const supportLink = screen.getByRole('link', { name: /contact our support team/i });
    expect(supportLink).toHaveAttribute('href', '/contact-us');

    const termsLinks = screen.getAllByRole('link', { name: 'Terms and Conditions' });
    expect(termsLinks).toHaveLength(2);

    const additionalInfoTermsLink = termsLinks.find(
      (link) => link.closest('.payment-options-page__additional-info') !== null
    );
    expect(additionalInfoTermsLink).toHaveAttribute('href', '/terms-and-conditions');
  });
});
