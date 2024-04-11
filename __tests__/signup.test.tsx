import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SignUp from "../components/Signup";
import { useRouter } from 'next/navigation';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("SignUp component", () => {
  test("submits form with valid data", async () => {
    // Render the component
    const { getByPlaceholderText, getByText } = render(<SignUp />);
    
    // Fill out form fields
    fireEvent.input(getByPlaceholderText("Username"), { target: { value: "testuser" } });
    fireEvent.input(getByPlaceholderText("Password"), { target: { value: "password" } });
    fireEvent.input(getByPlaceholderText("Confirm Password"), { target: { value: "password" } });
    
    // Submit the form
    fireEvent.click(getByText("Submit"));

    // Wait for router push to be called
    await waitFor(() => {
      expect(useRouter().push).toHaveBeenCalledWith('/information');
    });
  });

  // Add other tests as needed...
});
