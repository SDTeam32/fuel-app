// SignUp.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignUp from './ProfileForm';

// Mock useRouter
const mockPush = jest.fn();
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock supabase
const mockSelect = jest.fn();
jest.mock('@/utils/supabase/server', () => ({
  supabase: {
    from: () => ({
      select: mockSelect,
    }),
  },
}));

// Mock useUser
const mockSetUserName = jest.fn();
const mockSetUserAddress1 = jest.fn();
const mockSetUserAddress2 = jest.fn();
const mockSetUserCity = jest.fn();
const mockSetUserState = jest.fn();
const mockSetUserZip = jest.fn();
jest.mock('../hooks/useUser', () => ({
  useUser: () => ({
    setUserName: mockSetUserName,
    setUserAddress1: mockSetUserAddress1,
    setUserAddress2: mockSetUserAddress2,
    setUserCity: mockSetUserCity,
    setUserState: mockSetUserState,
    setUserZip: mockSetUserZip,
  }),
}));

describe('SignUp', () => {
  beforeEach(() => {
    mockPush.mockReset();
    mockSelect.mockReset();
    mockSetUserName.mockReset();
    mockSetUserAddress1.mockReset();
    mockSetUserAddress2.mockReset();
    mockSetUserCity.mockReset();
    mockSetUserState.mockReset();
    mockSetUserZip.mockReset();
    mockSelect.mockResolvedValue({ data: [{ state_abbreviation: 'TX', id: 1 }], error: null });
  });

  it('should render correctly with all fields', () => {
    render(<SignUp />);
    expect(screen.getByPlaceholderText('Full Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Address 1')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Address 2')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('City')).toBeInTheDocument();
    expect(screen.getByLabelText('State')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('ZIP')).toBeInTheDocument();
  });

  it('should handle state selection and form submission', async () => {
    render(<SignUp />);
    userEvent.type(screen.getByPlaceholderText('Full Name'), 'John Doe');
    userEvent.type(screen.getByPlaceholderText('Address 1'), '123 Main St');
    userEvent.type(screen.getByPlaceholderText('Address 2'), 'Apt 4');
    userEvent.type(screen.getByPlaceholderText('City'), 'Metropolis');
    userEvent.selectOptions(screen.getByLabelText('State'), 'TX');
    userEvent.type(screen.getByPlaceholderText('ZIP'), '12345');
    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/profile');
      expect(mockSetUserName).toHaveBeenCalledWith('John Doe');
      expect(mockSetUserAddress1).toHaveBeenCalledWith('123 Main St');
      expect(mockSetUserAddress2).toHaveBeenCalledWith('Apt 4');
      expect(mockSetUserCity).toHaveBeenCalledWith('Metropolis');
      expect(mockSetUserState).toHaveBeenCalledWith('TX');
      expect(mockSetUserZip).toHaveBeenCalledWith('12345');
    });
  });

  it('should fetch states on component mount', async () => {
    render(<SignUp />);
    await waitFor(() => {
      expect(mockSelect).toHaveBeenCalled();
    });
  });

  it('should show an error if state fetching fails', async () => {
    mockSelect.mockRejectedValueOnce(new Error('Failed to fetch'));
    render(<SignUp />);
    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith('Error fetching states:', expect.any(Error));
    });
  });

  // Test if all form validations work correctly
  it('should validate form fields before submission', async () => {
    render(<SignUp />);
    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => {
      expect(mockPush).not.toHaveBeenCalled();
    });
    expect(screen.getByText('Required.')).toBeInTheDocument();
  });

  // Test the form interaction with each input
  it('should update state on user input', () => {
    render(<SignUp />);
    const nameInput = screen.getByPlaceholderText('Full Name') as HTMLInputElement;
    const addressInput = screen.getByPlaceholderText('Address 1') as HTMLInputElement;
    userEvent.type(nameInput, 'Jane');
    userEvent.type(addressInput, '123 Elm Street');
    expect(nameInput.value).toBe('Jane');
    expect(addressInput.value).toBe('123 Elm Street');
  });

  // Simulate a button click for submission if your form uses a button
  it('should call onSubmit when the submit button is clicked', async () => {
    render(<SignUp />);
    userEvent.type(screen.getByPlaceholderText('Full Name'), 'John Doe');
    userEvent.type(screen.getByPlaceholderText('Address 1'), '123 Main St');
    // ... fill in other fields ...
    const submitButton = screen.getByRole('button', { name: /submit/i });
    userEvent.click(submitButton);
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/profile');
    });
  });
});
