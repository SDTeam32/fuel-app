import { render } from '@testing-library/react';
import Profile from '../app/(pages)/profile/page'; // Replace 'path/to/Profile' with the correct path

jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn()
  })
}));

const mockAlert = jest.fn();
Object.defineProperty(window, 'alert', {
  configurable: true,
  value: mockAlert,
});

jest.mock("../hooks/useUser.ts", () => ({
  useUser: jest.fn(() => ({
    userID: 'testUserID',
    userAddress1: 'testAddress',
    userCity: 'testCity',
    userState: 'testState',
    userZip: 'testZIP'
  }))
}));

describe('Profile Page', () => {
  it('renders user information', () => {
    const { getByText } = render(<Profile />);
    const welcomeText = getByText('Welcome, testUserID');
    const addressText = getByText('Address: testAddress');
    const cityText = getByText('City: testCity');
    const stateText = getByText('State: testState');
    const zipText = getByText('ZIP: testZIP');

    expect(welcomeText).toBeInTheDocument();
    expect(addressText).toBeInTheDocument();
    expect(cityText).toBeInTheDocument();
    expect(stateText).toBeInTheDocument();
    expect(zipText).toBeInTheDocument();
  });

  it('renders dashboard button', () => {
    const { getByText } = render(<Profile />);
    const dashboardButton = getByText('dashboard');
    expect(dashboardButton).toBeInTheDocument();
  });

  // Add more test cases as needed
});
