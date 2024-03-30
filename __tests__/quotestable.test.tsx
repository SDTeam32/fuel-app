import { render, fireEvent } from '@testing-library/react';
import QuotesTable from '../components/QuotesTable';

// Mocking the array of quotes
const quotesMock = [
  {
    id: 1,
    dateCreated: '2024-03-28',
    gallonsReq: 64,
    sugPrice: 2.42,
    totalPrice: 154.88
  },
  {
    id: 2,
    dateCreated: '2024-03-29',
    gallonsReq: 100,
    sugPrice: 2.5,
    totalPrice: 250
  }
];

describe('QuotesTable component', () => {
  it('renders table with correct number of rows', () => {
    const { getAllByRole } = render(<QuotesTable quotes={quotesMock} />);
    const rows = getAllByRole('row');

    // There should be a header row and one row for each quote
    expect(rows.length).toBe(quotesMock.length + 1);
  });

  it('opens modal with correct quote details when row is clicked', () => {
    const { getByText, queryByText } = render(<QuotesTable quotes={quotesMock} />);
    
    // Initially, modal should not be visible
    expect(queryByText('Date Created: 2024-03-28')).toBeNull();

    // Click on the first row to open modal
    fireEvent.click(getByText('2024-03-28'));

    // Check if modal displays correct quote details
    expect(getByText('Date Created: 2024-03-28')).toBeInTheDocument();
    expect(getByText('# of Gallons: 64')).toBeInTheDocument();
    expect(getByText('Rate: 2.42')).toBeInTheDocument();
    expect(getByText('Total Price: 154.88')).toBeInTheDocument();
  });

  // Add more tests as needed
});
