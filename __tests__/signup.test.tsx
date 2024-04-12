import SignUp from "../components/Signup";
import {useForm} from "react-hook-form"
import bcrypt, { compareSync } from 'bcryptjs'
// import { supabase } from "../utils/supabase/server";
import { useRouter } from "next/navigation";
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// This is your mock from the setup file
jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}));
const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({
  push: mockPush
});

const mockResultData =  {
        data:{},
        error: null
    }


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



jest.mock('bcryptjs', () => ({
    hashSync: jest.fn().mockReturnValue('hashed_password'),
}));



describe('SignUp', () => {
    // const supaMock = jest.requireMock('../utils/supabase/server')
    beforeEach(() => {
        // supaMock.mockReturnValue({
        //     data: mockResultData
        // })
      });
    it('renders when modal show is true', () => {
        render(<SignUp show={true} onClose={() => {}} onSuccess={() => {}}/>)
        expect(screen.getByTestId("backdrop")).toBeInTheDocument()
    })
    it('should handle signup functionallity', async () => {

        const { getByTestId, getByText } = render(<SignUp show={true}  onClose={() => {}} onSuccess={() => {}}/>);
        fireEvent.change(getByTestId('username'), { target: { value: 'john_doe' } });
        fireEvent.change(getByTestId('password'), { target: { value: 'password123' } });
        fireEvent.change(getByTestId('password2'), { target: { value: 'password123' } });
        fireEvent.click(getByText('Submit'))

        //ASSERTION
        await waitFor(() => {
            // Check if the Supabase query was made with the correct table and filter
            expect(mockPush).toHaveBeenCalled()

           
        });
    });
})

