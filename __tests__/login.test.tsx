import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import LogIn from '../components/Login';
import { useRouter } from 'next/navigation';

// Mocking the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

// Mocking the useUser hook
jest.mock('../hooks/useUser', () => ({
  useUser: jest.fn().mockReturnValue({
    userID: 'testUserID',
    userCode: 'testUserCode',
  }),
}));

describe('LogIn component', () => {
  it('should display error message if username or password is incorrect', async () => {
    const { getByLabelText, getByText } = render(<LogIn />);
    
    fireEvent.change(getByLabelText(/username/i), { target: { value: 'invalidUsername' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'invalidPassword' } });
    fireEvent.click(getByText(/submit/i));

    await waitFor(() => {
      expect(getByText(/username or password is incorrect/i)).toBeInTheDocument();
    });
  });

  it('should redirect to profile page if username and password are correct', async () => {
    const { getByLabelText, getByText } = render(<LogIn />);
    
    fireEvent.change(getByLabelText(/username/i), { target: { value: 'testUserID' } });
    fireEvent.change(getByLabelText(/password/i), { target: { value: 'testUserCode' } });
    fireEvent.click(getByText(/submit/i));

    await waitFor(() => {
      expect(useRouter().push).toHaveBeenCalledWith('/profile');
    });
  });
});
