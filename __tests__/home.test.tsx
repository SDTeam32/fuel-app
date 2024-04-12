import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Home from '../app/page'; // Adjust the path based on your project structure
import { useRouter } from 'next/navigation'; // Change import to useRouter from 'next/router'

// Mocking useRouter hook
jest.mock("next/navigation", () => ({
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn()
    })
  }));

// Mocking useUser hook
jest.mock('../hooks/useUser', () => ({
  useUser: () => ({
    isLoggedIn: false, // Assuming user is not logged in initially
    setLoggedIn: jest.fn(),
  }),
}));

// Mocking Login component
jest.mock('../components/Login', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Login Component Mock</div>), // Mocking Login component behavior
}));

// Mocking TextPlugin import
jest.mock('gsap/TextPlugin', () => ({
  TextPlugin: jest.fn(), // Assuming TextPlugin doesn't have any specific functionality to mock
}));

describe('Home Page', () => {
  it('renders without crashing', () => {
    render(<Home />);
  });

  it('redirects to dashboard on quote click when user is logged in', () => {
    const { getByText } = render(<Home />);
    fireEvent.click(getByText('Request Quote'));
    expect(useRouter().push).toHaveBeenCalledWith('/dashboard');
  });

  it('shows login modal on quote click when user is not logged in', () => {
    // Mocking setShowLogin function
    const setShowLogin = jest.fn();
    
    // Render Home component
    const { getByText } = render(<Home />);
    
    // Simulate click on "Request Quote" button
    fireEvent.click(getByText('Request Quote'));
    
    // Expect setShowLogin to have been called with true
    expect(setShowLogin).toHaveBeenCalledWith(true);
  });
});
