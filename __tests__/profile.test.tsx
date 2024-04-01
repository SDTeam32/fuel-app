import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from '../app/(pages)/profile/page'; // Adjust the import path as needed
import * as useUserHook from '../hooks/useUser';
import Navbar from "../components/NavBar";

// Mocking the external components and hooks
jest.mock('..//components/NavBar', () => () => <div>Mock Navbar</div>);
jest.mock('../hooks/useUser', () => ({
  useUser: jest.fn(),
}));

describe.only('Profile Component', () => {
  // Providing a mock user object
  const mockUser = {
    userID: 'User123',
    userAddress1: '123 Test Street',
    userCity: 'Testville',
    userState: 'TS',
    userZip: '12345',
  };

 

  it('renders user information correctly', () => {
    render(<Profile />);
    
    // Checking for the Navbar component
    expect(screen.getByText(/Mock Navbar/i)).toBeInTheDocument();

    // Verifying that the user information is displayed correctly
    expect(screen.getByText(/Welcome, User123/i)).toBeInTheDocument();
    expect(screen.getByText(/Address: 123 Test Street/i)).toBeInTheDocument();
    expect(screen.getByText(/City: Testville/i)).toBeInTheDocument();
    expect(screen.getByText(/State: TS/i)).toBeInTheDocument();
    expect(screen.getByText(/ZIP: 12345/i)).toBeInTheDocument();
  });

  // Add more tests here to cover other aspects like button interactions, conditional rendering, etc.
});
