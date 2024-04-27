import Dashboard from "../app/(pages)/dashboard/page";
import { fireEvent, render, screen, waitFor , act, findByText, getByPlaceholderText} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { useRouter } from "next/navigation";
import { supabase } from "../utils/supabase/server";
import { useUser } from "../hooks/useUser";

// This is your mock from the setup file
jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}));
const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({
  push: mockPush
});

// jest.mock('../hooks/useUser', () => ({

// }))
const mockSingle = jest.fn().mockResolvedValue({
  data: [{
    id:0,
    user_id:32, 
    date_created: "04/03/2024",
    gallons_req: 64, 
    sug_price: 2.42, 
    total_price:232}],
  error: 
    null
})

// jest.mock('../utils/supabase/server', () => {
//     const mockQuery = jest.fn(() => ({
//       select: jest.fn().mockReturnThis(),
//       eq: jest.fn().mockResolvedValue({data: [{
//         id:0,
//         user_id:0, 
//         date_created: "04/03/2024",
//          gallons_req: 64, 
//         sug_price: 2.42, 
//         total_price:232}], error: null}),
//       single: mockSingle,
//       insert: jest.fn().mockResolvedValue({ error: null })
//     }));
  
//     return {
//       __esModule: true,
//       supabase: {
//         from: mockQuery
//       }
//     };
//   });
jest.mock('../utils/supabase/server', () => ({
  __esModule: true,
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn().mockResolvedValue({
      data: [{
        id:0,
        user_id:32, 
        date_created: "04/03/2024",
        gallons_req: 64, 
        sug_price: 2.42, 
        total_price:232}],
      error: 
        null
    }),
  },
}));


describe('Dashboard', () => {
  const mockQuotes = [
    { id: 0, user_id: 0, date_created: '2021-01-01', gallons_req: 64, sug_price: 2.42, total_price: 231 },
  ];

  test('renders the main UI components', () => {
      /* fire events that update state */
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
    jest.mock('../utils/supabase/server', () => ({
      __esModule: true,
      supabase: {
        from: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({
          data: [{
            id:0,
            user_id:32, 
            date_created: "04/03/2024",
            gallons_req: 64, 
            sug_price: 2.42, 
            total_price:232}],
          error: 
            null
        }),
      },
    }));
    const { getByTestId, getByText, findByText, getByPlaceholderText } = render(<Dashboard/>);
    
    fireEvent.click(getByTestId("newquote"))
    // fireEvent.change(get)
    // const gallonsInpt = screen.getByTestId("gallons_req")
    // userEvent.type(gallonsInpt, "12")
    // const dateInpt = screen.getByTestId("date")
    // userEvent.type(dateInpt, "10/12/24")


    fireEvent.change(screen.getByTestId("gallons_req"), { target: { value: "32" } })
    fireEvent.change(screen.getByTestId("date"), { target: { value: '10/12/2024' } })
    // fireEvent.click(screen.getByText("Submit"))
    await act(async () => {
      // Interact with your component to trigger the async operation
      fireEvent.click(screen.getByText('Get Quote'));
  
      // You can also resolve any promises inside the act block
      // await getQuotes();
  
      // Now that the async operations are complete, the state should be updated
      // You can perform assertions here or outside the act block
    });

    expect(screen.getByText("Submit")).toBeInTheDocument();



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