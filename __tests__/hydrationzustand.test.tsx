
import HydrationZustand from "@/components/HydrationZustand";
import { fireEvent, render, screen, waitFor, act } from '@testing-library/react';

describe('HydrationZustand', () => {


 it('renders children after hydration', async () => {
   const { queryByTestId } = render(
     <HydrationZustand>
       <div data-testid="child">Child</div>
     </HydrationZustand>
   );


   // Use act to wait for effects to run
   await act(async () => {
     // Here you would typically wait for the next tick in the event loop.
     // This simulates waiting for the useEffect to run and update the state.
     await new Promise((r) => setTimeout(r, 0));
   });


   expect(queryByTestId('child')).not.toBeNull();
 });
});
