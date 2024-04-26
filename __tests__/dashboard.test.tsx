import Dashboard from "../app/(pages)/dashboard/page";
import { fireEvent, render, screen, waitFor , act, findByText} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useRouter } from "next/navigation";
import { supabase } from "../utils/supabase/server";

// This is your mock from the setup file
jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}));
const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({
  push: mockPush
});

jest.mock('../utils/supabase/server', () => {
    const mockQuery = jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockResolvedValue({data: [{
        id:0,
        user_id:0, 
        date_created: "04/03/2024",
         gallons_req: 64, 
        sug_price: 2.42, 
        total_price:232}], error: null}),
      single: jest.fn().mockResolvedValue({data: [{
        id:0,
        user_id:0, 
        date_created: "04/03/2024",
         gallons_req: 64, 
        sug_price: 2.42, 
        total_price:232}], error: null}),
      insert: jest.fn().mockResolvedValue({ error: null })
    }));
  
    return {
      __esModule: true,
      supabase: {
        from: mockQuery
      }
    };
  });


describe('Dashboard', () => {
  const mockQuotes = [
    { id: 0, user_id: 0, date_created: '2021-01-01', gallons_req: 64, sug_price: 2.42, total_price: 231 },
  ];

  test('renders the main UI components', () => {
    render(<Dashboard />);
    
    expect(screen.getByText('Quotes')).toBeInTheDocument();
    // expect(screen.getByText('A list of Quotes retrieved from Supabase. (not connected yet)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /New Quote/i })).toBeInTheDocument();
  });
  it('should get the quotes :)', async () => {
    await act(async () => {
      render(<Dashboard />);
      await waitFor(() => {
        expect(supabase.from).toHaveBeenCalledWith("quote");
      });
    });
    // expect(getByText("64")).toBeInTheDocument()
  })
  it('handles new Quotes',async () => {
    const { getByTestId, getByText, findByText } = render(<Dashboard/>);
    fireEvent.click(getByTestId("newquote"))
    fireEvent.change(getByTestId("gallons_req"), { target: { value: 32 } })
    fireEvent.change(getByTestId("date"), { target: { value: '4/14/24' } })
    fireEvent.click(getByText("Submit"))

    await act(async () => {
      await findByText("04/12/2024")
    })

  })

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