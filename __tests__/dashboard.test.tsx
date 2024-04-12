import Dashboard from "../app/(pages)/dashboard/page";
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

jest.mock("next/navigation", () => ({
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn()
    })
  }));

describe('Dashboard', () => {
  test('renders the main UI components', () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL='https://figgdmjjimoaiwlbtekw.supabase.co/';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZpZ2dkbWpqaW1vYWl3bGJ0ZWt3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcxNjE1MTIsImV4cCI6MjAyMjczNzUxMn0.1egRR2QeqBOZBCw33yVWHYotnnmcZAlMxmcODzKeAII';
    render(<Dashboard />);
    
    expect(screen.getByText('Quotes')).toBeInTheDocument();
    expect(screen.getByText('A list of Quotes retrieved from Supabase. (not connected yet)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /new quote/i })).toBeInTheDocument();
  });

  // test('toggles the quote modal on button click', async () => {
  //   render(<Dashboard />);
    
  //   const newQuoteButton = screen.getByRole('button', { name: /new quote/i });

  //   // Click the button to open the Modal
  //   userEvent.click(newQuoteButton);
    
  //   // Wait for the "Submit" button to appear in the document
  //   await waitFor(() => expect(screen.getByText('Submit')).toBeInTheDocument());
    
  //   // Click again to close
  //   userEvent.click(newQuoteButton);

  //   // Wait for the "Submit" button to disappear from the document
  //   await waitFor(() => expect(screen.queryByText('Submit')).not.toBeInTheDocument());
  // });
  // test('opens and closes the modal', async () => {
  //   render(<Dashboard />);
    
  //   // Open the Modal
  //   const newQuoteButton = screen.getByRole('button', { name: /new quote/i });
  //   userEvent.click(newQuoteButton);
  //   expect(screen.getByText(/Rate/i)).toBeInTheDocument();

  //   // Close the Modal by triggering the onClose prop
  //   const closeButton = await screen.findByTestId('close-modal-button'); // Adjust this line to match your close button
  //   fireEvent.click(closeButton);

  //   // Modal should not be in the document
  //   expect(screen.queryByTestId('close-modal-button')).not.toBeInTheDocument();
  // });

  // Add more tests as needed for further interactions and state changes
});