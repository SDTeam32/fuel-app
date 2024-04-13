import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Navigation from '../components/Navigation';
import { usePathname, useRouter } from 'next/navigation'; // Import usePathname and useRouter
import { useUser } from '../hooks/useUser';

jest.mock('../hooks/useUser', () => ({
  useUser: jest.fn(),
}));

jest.mock('../hooks/useUser', () => ({
    useUser: jest.fn(),
  }));

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

describe('Navigation', () => {
  beforeEach(() => {
    // Mock isLoggedIn state to false initially
    (useUser as unknown as jest.Mock).mockReturnValue({ isLoggedIn: false, setLoggedIn: jest.fn() });
  });

  it('renders without crashing', () => {
    render(<Navigation />);
  });

  it('redirects to dashboard on dashboard button click when user is logged in', () => {
    // Mock isLoggedIn state to true
    (useUser as unknown as jest.Mock).mockReturnValue({ isLoggedIn: true, setLoggedIn: jest.fn() });
    // Mock useRouter function
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    // Mock usePathname function
    (usePathname as jest.Mock).mockReturnValue('/');

    const { getByText } = render(<Navigation />);
    fireEvent.click(getByText('Dashboard', { exact: false }));
    expect(useRouter().push).toHaveBeenCalledWith('/dashboard');
  });

  it('shows login modal on login button click when user is not logged in', () => {
    const { getByText } = render(<Navigation />);
    fireEvent.click(getByText('Log in', { exact: false }));
    // Add assertions for showing the login modal
  });

  it('shows signup modal on signup button click when user is not logged in', () => {
    const { getByText } = render(<Navigation />);
    fireEvent.click(getByText('Sign Up', { exact: false }));
    // Add assertions for showing the signup modal
  });
});
