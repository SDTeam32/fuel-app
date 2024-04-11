import React from 'react';
import { render, screen } from '@testing-library/react';
import QuotesDetail from '../components/QuotesDetail';

describe('<QuotesDetail />', () => {
  // Setup a render before each test
  beforeEach(() => {
    render(<QuotesDetail />);
  });

  // Test if QuotesDetail component renders
  it('renders the component', () => {
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
  });

  // Test if the component renders quote details correctly
  it('displays the correct quote information', () => {
    expect(screen.getByText('Date Created:')).toBeInTheDocument();
    expect(screen.getByText('02/23/2001')).toBeInTheDocument();
    expect(screen.getByText('# of Gallons:')).toBeInTheDocument();
    expect(screen.getByText('64')).toBeInTheDocument();
    expect(screen.getByText('Rate:')).toBeInTheDocument();
    expect(screen.getByText('$2.42')).toBeInTheDocument();
    expect(screen.getByText('Total Price:')).toBeInTheDocument();
    expect(screen.getByText('$154.88')).toBeInTheDocument();
  });

  // Test if the component renders personal information correctly
  it('displays the correct personal information', () => {
    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Address:')).toBeInTheDocument();
    expect(screen.getByText('123 Main Street')).toBeInTheDocument();
    expect(screen.getByText('City:')).toBeInTheDocument();
    expect(screen.getByText('Houston')).toBeInTheDocument();
    expect(screen.getByText('State:')).toBeInTheDocument();
    expect(screen.getByText('TX')).toBeInTheDocument();
  });

  // Test if the styles are applied correctly (you could do this for each style or for key styles)
  it('applies the card style', () => {
    const cardElements = screen.getAllByRole('region'); // Assuming you would have role='region' on your card divs
    expect(cardElements[0]).toHaveStyle({
      background: '#fff',
      padding: '1rem',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    });
  });
});
