import { render, screen, fireEvent } from '@testing-library/react';
import QuotesTable from '../components/QuotesTable';


describe('QuotesTable component', () => {
 const mockQuotes = [
   {
     id: 1,
     date_created: '2024-04-12',
     gallons_req: 100,
     sug_price: 2.42,
     total_price: 242,
     user_id: 1 // Adding user_id property
   },
   {
     id: 2,
     date_created: '2024-04-13',
     gallons_req: 150,
     sug_price: 2.5,
     total_price: 375,
     user_id: 1 // Adding user_id property
   }
 ];


 test('renders table with quotes', () => {
   render(<QuotesTable quotes={mockQuotes} />);
  
   const table = screen.getByRole('table');
   expect(table).toBeInTheDocument();


   const tableRows = screen.getAllByRole('row');
   expect(tableRows).toHaveLength(mockQuotes.length + 1); // plus one for header row
 });


 test('clicking on a quote row opens modal with quote details', () => {
   render(<QuotesTable quotes={mockQuotes} />);
  
   // Find a quote row and click on it
   const quoteRow = screen.getByText('2024-04-12').closest('tr');
   if (quoteRow) {
     fireEvent.click(quoteRow);
   }


   // Check if modal is opened with the correct quote details
   const modal = screen.getByTestId('modal');
   expect(modal).toBeInTheDocument();


   const modalContent = screen.getByTestId('quotes-detail');
   expect(modalContent).toBeInTheDocument();
 });
});
