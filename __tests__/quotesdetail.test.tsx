import React from 'react';
import { render } from '@testing-library/react';
import QuotesDetail from '../components/QuotesDetail'; 


describe('QuotesDetail Component', () => {
   it('renders without crashing', () => {
     const currentQuote = {
       id: 1,
       user_id: 123,
       date_created: '02/23/2001',
       gallons_req: 64,
       delivery_addr: '123 Main Street',
       delivery_date: '02/24/2001',
       sug_price: 2.42,
       total_price: 154.88,
     };
     render(<QuotesDetail key={currentQuote.id} quote={currentQuote} />);
   });
 });
