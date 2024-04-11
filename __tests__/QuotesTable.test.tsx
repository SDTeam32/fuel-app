import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import QuotesTable from '../components/QuotesTable';
import Modal from '../components/Modal';

describe('<QuotesTable />', () => {
  const mockQuotes = [
    {
      id: 1,
      dateCreated: '2024-03-29',
      noGallons: '100',
      rate: '2.50',
      totalPrice: '250.00'
    },
    {
      id: 2,
      dateCreated: '2024-03-30',
      noGallons: '200',
      rate: '2.75',
      totalPrice: '550.00'
    }
  ];

  beforeEach(() => {
    render(<QuotesTable quotes={mockQuotes} />);
  });

  it('renders the table with the correct headers', () => {
    expect(screen.getByText('Date Created')).toBeInTheDocument();
    expect(screen.getByText('# of Gallons')).toBeInTheDocument();
    expect(screen.getByText('Rate')).toBeInTheDocument();
    expect(screen.getByText('Total Price')).toBeInTheDocument();
  });

  it('displays the correct quote information', () => {
    expect(screen.getByText('2024-03-29')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('2.50')).toBeInTheDocument();
    expect(screen.getByText('250.00')).toBeInTheDocument();

    expect(screen.getByText('2024-03-30')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('2.75')).toBeInTheDocument();
    expect(screen.getByText('550.00')).toBeInTheDocument();
  });

  it('opens the modal when a row is clicked', () => {
    fireEvent.click(screen.getAllByText('2024-03-29')[0]); // Click on the first row
    expect(screen.getByTestId('modal')).toBeInTheDocument(); 
  });

  it('closes the modal when the close button is clicked', () => {
    fireEvent.click(screen.getAllByText('2024-03-29')[0]); // Open the modal
    fireEvent.click(screen.getByTestId('modal-close-button')); // Click the close button, assuming you have data-testid="modal-close-button"
    expect(screen.queryByTestId('modal')).toBeNull();
  });
});
