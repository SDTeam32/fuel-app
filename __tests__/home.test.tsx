import { render, fireEvent, screen } from '@testing-library/react';
import Home from '../app/page';

describe('Home', () => {
  test('renders the background image and sign-in button', () => {
    render(<Home />);
    
    // Check if the background image is rendered
    const backgroundImage = screen.getByAltText('Background Image');
    expect(backgroundImage).toBeInTheDocument();

    // Check if the sign-in button is rendered
    const signInButton = screen.getByText('Sign In');
    expect(signInButton).toBeInTheDocument();
  });

  test('opens the sign-up modal when the sign-in button is clicked', () => {
    render(<Home />);
    
    // Click the sign-in button
    const signInButton = screen.getByText('Sign In');
    fireEvent.click(signInButton);
    
    // Check if the sign-up modal is rendered
    const signUpModal = screen.getByTestId('signup-modal'); // Ensure you set testid for your modal component
    expect(signUpModal).toBeInTheDocument();
  });

  test('closes the sign-up modal when the modal is closed', () => {
    render(<Home />);
    
    // Open the sign-up modal
    const signInButton = screen.getByText('Sign In');
    fireEvent.click(signInButton);

    // Close the modal
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    // Check if the modal is closed
    const signUpModal = screen.queryByTestId('signup-modal'); // Ensure you set testid for your modal component
    expect(signUpModal).not.toBeInTheDocument();
  });
});
