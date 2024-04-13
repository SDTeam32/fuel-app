// import SignUp from "../components/Signup";
import {useForm} from "react-hook-form"
import bcrypt from 'bcryptjs'
// import { supabase } from "../utils/supabase/server";
import { useRouter } from "next/navigation";
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Login from "@/components/Login";

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
    compareSync: jest.fn().mockReturnValue(true)
}));

describe('Login', () => {
    it('should render correctly', () => {


        render(<Login show={true} onClose={() => {}} onSuccess={() => {}}/>)
        expect(screen.getByTestId("backdrop")).toBeInTheDocument()
    })
    it('should login if password correct', async () => {
        const { getByTestId, getByText } = render(<Login show={true}  onClose={() => {}} onSuccess={() => {}}/>);
        fireEvent.change(getByTestId('username'), { target: { value: 'john_doe' } });
        fireEvent.change(getByTestId('password'), { target: { value: 'password123' } });
        fireEvent.click(getByText('Submit'))

        await waitFor(() => {
            // Check if the Supabase query was made with the correct table and filter
            expect(mockPush).toHaveBeenCalled()

            // expect(mockFrom).toHaveBeenCalledWith('credentials');
            // expect(mockSelect).toHaveBeenCalledWith('user_id');
            // expect(mockEq).toHaveBeenCalledWith('username', 'john_doe');
      
            // Assuming you have some way to observe successful signup in your component:
            // expect(something).toBe(successful);
        });

    })
})