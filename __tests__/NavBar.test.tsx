import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/NavBar';
import '@testing-library/jest-dom';

describe('<Navbar />', () => {
  const mockUser = { name: 'John Doe' };

  beforeEach(() => {
    render(<Navbar user={mockUser} />);
  });

  it('renders the navigation links', () => {
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Dashboard').getAttribute('href')).toBe('/dashboard');
  });

  it('displays the user profile image', () => {
    expect(screen.getByAltText('no jalla bro')).toBeInTheDocument();
  });

  it('toggles the login/logout state when the user menu item is clicked', () => {
    fireEvent.click(screen.getByAltText('no jalla bro')); // Open the menu
    fireEvent.click(screen.getByText('Log In')); // Click the login button
    expect(screen.getByText('Log Out')).toBeInTheDocument(); // Check if the button text changed to 'Log Out'

    fireEvent.click(screen.getByAltText('no jalla bro')); // Re-open the menu
    fireEvent.click(screen.getByText('Log Out')); // Click the logout button
    expect(screen.getByText('Log In')).toBeInTheDocument(); // Check if the button text changed back to 'Log In'
  });

  it('renders the logo', () => {
    expect(screen.getByRole('img', { hidden: true })).toBeInTheDocument(); 
  });
});
