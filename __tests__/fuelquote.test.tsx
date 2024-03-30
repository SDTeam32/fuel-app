import { render, fireEvent, waitFor } from '@testing-library/react';
import FuelQuote from '../components/FuelQuote';

describe('FuelQuote component', () => {
  it('renders form fields correctly', () => {
    const { getByLabelText } = render(<FuelQuote sendQuote={() => {}} />);
    
    expect(getByLabelText('Gallons Requested')).toBeInTheDocument();
    expect(getByLabelText('Delivery Address')).toBeInTheDocument();
    expect(getByLabelText('Delivery Date')).toBeInTheDocument();
  });

  it('submits the form with correct data', async () => {
    const sendQuoteMock = jest.fn();
    const { getByLabelText, getByText } = render(<FuelQuote sendQuote={sendQuoteMock} />);
    
    // Fill form fields
    fireEvent.change(getByLabelText('Gallons Requested'), { target: { value: '100' } });
    fireEvent.change(getByLabelText('Delivery Date'), { target: { value: '2024-04-01' } });

    // Submit form
    fireEvent.click(getByText('Submit'));

    // Wait for onSubmit function to be called
    await waitFor(() => {
      expect(sendQuoteMock).toHaveBeenCalledWith({
        gallonsReq: 100,
        deliveryAddr: '123 Main St, 77032 Houston TX', // This is the fake address set in the component
        deliveryDate: '2024-04-01',
        sugPrice: 2.42, // This is the suggested price set in the component
        totalPrice: 242 // Assuming suggested price is 2.42, and gallons requested is 100
      });
    });
  });

  // Add more tests as needed
});
