import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import FuelQuote from '../components/FuelQuote'; // Import the FuelQuote component

// Define a mock interface for the props
interface FuelQuoteProps {
  sendQuote: jest.Mock<any, any>; // Mock function for sendQuote
}

describe('FuelQuote component', () => {
  test('renders correctly', async () => {
    const sendQuote = jest.fn(); // Mock the sendQuote function

    // Define props with the mock function
    const props: FuelQuoteProps = { sendQuote };

    // Render the FuelQuote component with the mocked props
    const { getByTestId } = render(<FuelQuote sendQuote={props.sendQuote} />);

    // Fill out the form fields
    fireEvent.change(getByTestId('gallons_req'), { target: { value: '64' } });
    fireEvent.change(getByTestId('date'), { target: { value: '2024-04-12' } });

    // Submit the form
    fireEvent.submit(getByTestId('form'));

    // Wait for the form submission to complete
    await waitFor(() => {
      // Check if sendQuote function is called with the correct data
      expect(sendQuote).toHaveBeenCalledWith({
        gallons_req: 64,
        delivery_addr: '123 Main St, 77032 Houston TX',
        delivery_date: '2024-04-12',
        sug_price: 2.42,
        total_price: 154.88
      });
    });
  });
});
