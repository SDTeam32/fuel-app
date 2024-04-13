import React from 'react';
import { render } from '@testing-library/react';
import Information from '../app/(pages)/information/page'; 


jest.mock('../utils/supabase/server', () => {
   const mockQuery = jest.fn(() => ({
     select: jest.fn().mockReturnThis(),
     eq: jest.fn().mockReturnThis(),
     single: jest.fn().mockResolvedValue({data: {
       user_id: '123',
       username: 'testuser',
       password: 'hashed_password'
     }, error: null}),
     insert: jest.fn().mockResolvedValue({ error: null })
   }));
    return {
     __esModule: true,
     supabase: {
       from: mockQuery
     }
   };
 });
 describe('Information Page', () => {
 it('renders without crashing', () => {
   render(<Information />);
 });

});


