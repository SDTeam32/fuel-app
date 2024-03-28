import React from 'react';
import { render } from '@testing-library/react';
import Profile from '../app/(pages)/information/page';

// Mock the useUser hook
jest.mock('../hooks/useUser', () => ({
  useUser: jest.fn(),
}));

// Mock the Image component from next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('Profile component', () => {
  it('renders profile form when user is logged in', () => {
    // Mock useUser to return a user with a userID
    const mockedUseUser = {
      userID: 'testUserID',
    };
    jest.spyOn(require('../../../hooks/useUser'), 'useUser').mockReturnValue(mockedUseUser);

    // Render the Profile component
    const { getByText } = render(<Profile />);

    // Expect the profile form to be rendered
    expect(getByText('Complete Profile')).toBeInTheDocument();
  });

  it('does not render profile form when user is not logged in', () => {
    // Mock useUser to return a user without a userID
    const mockedUseUser = {
      userID: undefined,
    };
    jest.spyOn(require('../../../hooks/useUser'), 'useUser').mockReturnValue(mockedUseUser);

    // Render the Profile component
    const { queryByText } = render(<Profile />);

    // Expect the profile form not to be rendered
    expect(queryByText('Complete Profile')).toBeNull();
  });
});
