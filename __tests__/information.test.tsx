import { render, screen } from '@testing-library/react';
import Profile from '../app/(pages)/information/page';
import * as useUserModule from '../hooks/useUser'; // Import useUser hook

// Mocking the useUser hook
jest.mock('../hooks/useUser');

describe('Profile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the background image and profile form', () => {
    const mockUseUser = jest.spyOn(useUserModule, 'useUser');
    mockUseUser.mockReturnValue({ userID: '123' });

    render(<Profile />);
    
    // Check if the background image is rendered
    const backgroundImage = screen.getByAltText('Background Image');
    expect(backgroundImage).toBeInTheDocument();

    // Check if the profile form is rendered
    const profileForm = screen.getByTestId('profile-form'); // Ensure you set testid for your ProfileForm component
    expect(profileForm).toBeInTheDocument();
  });

  // Add more tests for interaction and state changes as needed
});
