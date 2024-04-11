import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FuelQuote from '../components/FuelQuote';

describe('<FuelQuote />', () => {
    // Test 1: Component renders correctly
    it('renders the form with all fields and submit button', () => {
      render(<FuelQuote />);

      expect(screen.getByLabelText('Gallons Requested')).toBeInTheDocument();
      expect(screen.getByLabelText('Delivery Address')).toBeInTheDocument();
      expect(screen.getByLabelText('Delivery Date')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    });

    // Test 2: Submitting form with data
    it('submits the form with entered data', () => {
      render(<FuelQuote />);

      fireEvent.change(screen.getByLabelText('Gallons Requested'), { target: { value: '100' } });
      fireEvent.change(screen.getByLabelText('Delivery Address'), { target: { value: '1234 Main St' } });
      fireEvent.change(screen.getByLabelText('Delivery Date'), { target: { value: '2024-03-20' } });

      fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

      // Check if the form data is logged to the console (you might need to mock console.log for this)
      // expect(console.log).toHaveBeenCalledWith({ gallonsReq: 100, deliveryAddr: '1234 Main St', deliveryDate: '2024-03-20' });
    });
});
