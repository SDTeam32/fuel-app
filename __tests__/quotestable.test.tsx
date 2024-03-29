import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import QuotesTable from '../components/QuotesTable';

const mockQuotes = [
  {
    id: 1,
    dateCreated: '2024-03-26',
    noGallons: '10',
    rate: '2.5',
    totalPrice: '25',
  },
  {
    id: 2,
    dateCreated: '2024-03-27',
    noGallons: '15',
    rate: '3',
    totalPrice: '45',
  },
];

describe('QuotesTable component', () => {
  test('renders table with quotes data', () => {
    const { getByText } = render(<QuotesTable quotes={mockQuotes} />);
    
    expect(getByText('2024-03-26')).toBeInTheDocument();
    expect(getByText('10')).toBeInTheDocument();
    expect(getByText('2.5')).toBeInTheDocument();
    expect(getByText('25')).toBeInTheDocument();
    expect(getByText('2024-03-27')).toBeInTheDocument();
    expect(getByText('15')).toBeInTheDocument();
    expect(getByText('3')).toBeInTheDocument();
    expect(getByText('45')).toBeInTheDocument();
  });

  test('opens modal when a row is clicked', () => {
    const { getByText, getByTestId } = render(<QuotesTable quotes={mockQuotes} />);
    
    fireEvent.click(getByText('2024-03-26')); // Click on a row
    
    expect(getByTestId('modal')).toBeInTheDocument();
  });

  test('closes modal when close button is clicked', () => {
    const { getByText, getByTestId, queryByTestId } = render(<QuotesTable quotes={mockQuotes} />);
    
    fireEvent.click(getByText('2024-03-26')); // Open modal
    fireEvent.click(getByTestId('close-button')); // Close modal
    
    expect(queryByTestId('modal')).toBeNull();
  });
});
