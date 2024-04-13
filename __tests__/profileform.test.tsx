import SignUp from '@/components/ProfileForm';
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


describe('Profile Form', () => {
    it('renders', ()=> {
        const {getByTestId} = render(<SignUp/>)
        expect(getByTestId("profileform")).toBeInTheDocument()
    })
    it('calls router', ()=> {
        const {getByTestId, getByText} = render(<SignUp/>)
        fireEvent.change(getByTestId("name"), {target: {value: "testname"}})
        fireEvent.change(getByTestId("address1"), {target: {value:"testaddress" }})
        fireEvent.change(getByTestId("city"), {target: {value: "testcity"}})
        fireEvent.change(getByTestId("zip"), {target: {value: "testzip" }})
        fireEvent.change(getByTestId("state"), {target: {value: "teststate" }})

        fireEvent.click(getByText("Submit"))
        expect(mockPush).toHaveBeenCalled()
    })
})