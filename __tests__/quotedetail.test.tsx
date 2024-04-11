import { render } from '@testing-library/react';
import QuotesDetail from '../components/QuotesDetail';

// Mocking the QuoteInput object
const quoteInputMock = {
  dateCreated: '02/23/2001',
  gallonsReq: 64,
  sugPrice: 2.42,
  totalPrice: 154.88,
  name: 'John Doe',
  deliveryAddr: '123 Main Street',
  city: 'Houston',
  state: 'TX'
};

describe('QuotesDetail component', () => {
  it('renders personal information correctly', () => {
    const { getByText } = render(<QuotesDetail quote={quoteInputMock} />);
    
    expect(getByText('Name: John Doe')).toBeInTheDocument();
    expect(getByText('Address: 123 Main Street')).toBeInTheDocument();
    expect(getByText('City: Houston')).toBeInTheDocument();
    expect(getByText('State: TX')).toBeInTheDocument();
  });

  it('renders quote information correctly', () => {
    const { getByText } = render(<QuotesDetail quote={quoteInputMock} />);
    
    expect(getByText('Date Created: 02/23/2001')).toBeInTheDocument();
    expect(getByText('# of Gallons: 64')).toBeInTheDocument();
    expect(getByText('Rate: 2.42')).toBeInTheDocument();
    expect(getByText('Total Price: 154.88')).toBeInTheDocument();
  });

  // Add more tests as needed
});
