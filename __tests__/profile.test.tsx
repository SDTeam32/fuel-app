import { render, fireEvent } from '@testing-library/react';
import Profile from '../app/(pages)/profile/page'; // Assuming the file name is profile.tsx
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock('../hooks/useUser', () => ({
  useUser: jest.fn(() => ({
    userID: 'JohnDoe',
    userAddress1: '123 Main St',
    userCity: 'Houston',
    userState: 'TX',
    userZip: '77002',
  })),
}));

describe('Profile page', () => {
  it('renders user information correctly', () => {
    const { getByText } = render(<Profile />);
    
    expect(getByText('Welcome, JohnDoe')).toBeInTheDocument();
    expect(getByText('Address: 123 Main St')).toBeInTheDocument();
    expect(getByText('City: Houston')).toBeInTheDocument();
    expect(getByText('State: TX')).toBeInTheDocument();
    expect(getByText('ZIP: 77002')).toBeInTheDocument();
  });

  it('redirects to dashboard when the button is clicked', () => {
    const { getByText } = render(<Profile />);
    const dashboardButton = getByText('dashboard');
    
    fireEvent.click(dashboardButton);
    
    expect(useRouter().push).toHaveBeenCalledWith('/dashboard');
  });
});
