import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import ProfileForm from "../components/ProfileForm";
import { useUser } from '../hooks/useUser';
import { useRouter } from 'next/navigation';

// Mock useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

// Mock useUser hook
jest.mock('../hooks/useUser', () => ({
  useUser: jest.fn().mockReturnValue({
    setUserName: jest.fn(),
    setUserAddress1: jest.fn(),
    setUserAddress2: jest.fn(),
    setUserCity: jest.fn(),
    setUserState: jest.fn(),
    setUserZip: jest.fn(),
  }),
}));

describe("ProfileForm", () => {
  it("should submit form with valid data", async () => {
    const { getByLabelText, getByText } = render(<ProfileForm />);
    
    fireEvent.change(getByLabelText(/full name/i), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText(/address 1/i), { target: { value: '123 Main St' } });
    fireEvent.change(getByLabelText(/address 2/i), { target: { value: 'Apt 202' } });
    fireEvent.change(getByLabelText(/city/i), { target: { value: 'New York' } });
    fireEvent.change(getByLabelText(/state/i), { target: { value: 'NY' } });
    fireEvent.change(getByLabelText(/zip/i), { target: { value: '12345' } });
    fireEvent.click(getByText(/submit/i));

    await waitFor(() => {
      expect(useUser().setUserName).toHaveBeenCalledWith('John Doe');
      expect(useUser().setUserAddress1).toHaveBeenCalledWith('123 Main St');
      expect(useUser().setUserAddress2).toHaveBeenCalledWith('Apt 202');
      expect(useUser().setUserCity).toHaveBeenCalledWith('New York');
      expect(useUser().setUserState).toHaveBeenCalledWith('NY');
      expect(useUser().setUserZip).toHaveBeenCalledWith('12345');
      expect(useRouter().push).toHaveBeenCalledWith('/dashboard');
    });
  });

  it("should display error messages for invalid inputs", async () => {
    const { getByLabelText, getByText } = render(<ProfileForm />);

    // Submit form without filling any fields
    fireEvent.click(getByText(/submit/i));

    // Check for required field errors
    await waitFor(() => {
      expect(getByText(/required/i)).toBeInTheDocument();
    });

    // Fill in invalid inputs
    fireEvent.change(getByLabelText(/full name/i), { target: { value: '' } });
    fireEvent.change(getByLabelText(/zip/i), { target: { value: '1234' } });

    // Submit the form
    fireEvent.click(getByText(/submit/i));

    // Check for specific error messages
    await waitFor(() => {
      expect(getByText(/At most 50 characters/i)).toBeInTheDocument(); // Name max length error
      expect(getByText(/At least 5 characters/i)).toBeInTheDocument(); // ZIP min length error
    });
  });
});
