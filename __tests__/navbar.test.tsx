// __tests__/Navbar.test.jsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../components/Navigation'; // Adjust the relative path as necessary
import { useUser } from '../hooks/useUser';
// Mock the entire useUser module
jest.mock('../hooks/useUser', () => ({
    useUser: () => ({
        userID: 'mocked-id', // provide a mock userID
        // Mock other properties and setters as needed
      }),
}));

describe('Navbar', () => {
  const mockLogoutUser = jest.fn();
  const mockSignIn = jest.fn();

  // Define a mock user state before each test
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<Navbar />);
    expect(screen.getByTestId('navtest')).toBeInTheDocument();
  });

  it('should display sign in option when user is not logged in', () => {
    render(<Navbar />);
    jest.mock('../hooks/useUser', () => ({
        useUser: () => ({
            userID: undefined, // provide a mock userID
            // Mock other properties and setters as needed
          }),
    }));
    const mockSignIn = jest.fn()
    Navbar.prototype.signIn = mockSignIn
    const  image = screen.getByTestId("imageButton")
    fireEvent.click(image)
    const signInButton = screen.getByTestId("signInButton")
    fireEvent.click(signInButton)
    
    // Assertions that sign in function has been called
    expect(mockSignIn).toHaveBeenCalled()
  });

//   it('should display sign out and profile options when user is logged in', () => {
//     // Mock the user being logged in
//     useUser.mockImplementation(() => ({
//       userID: 'some-user-id',
//       logoutUser: mockLogoutUser,
//       // Add other user properties as needed
//     }));

//     render(<Navbar />);

//     // Assertions for the presence of sign out and profile buttons when logged in
//     const signOutButton = screen.getByRole('button', { name: 'Sign out' });
//     const profileButton = screen.getByRole('button', { name: 'Profile' });

//     expect(signOutButton).toBeInTheDocument();
//     expect(profileButton).toBeInTheDocument();

//     // Simulate the user clicking the sign out button
//     fireEvent.click(signOutButton);
//     expect(mockLogoutUser).toHaveBeenCalled();

//     // The following line would be used if you were to actually navigate on click,
//     // but in Jest environment, you'd have to mock the navigation
//     // fireEvent.click(profileButton);
//   });

  // Add more tests as needed for additional functionality
});
