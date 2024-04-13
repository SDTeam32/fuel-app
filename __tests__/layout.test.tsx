import { render, screen } from '@testing-library/react';
import RootLayout from '../app/layout';
import '@testing-library/jest-dom';
import { ReactNode } from 'react';


jest.mock('next/font/google', () => ({
   Inter: () => ({ className: "mocked-class-name" })
 }));


jest.mock('next/navigation', () => ({
 usePathname: jest.fn(),
}));


jest.mock('@/components/Navigation', () => {
 return function DummyNavigation() {
   return <div>Navigation</div>;
 };
});


jest.mock('@/components/HydrationZustand', () => {
 return function DummyHydrationZustand({ children }: { children: ReactNode }) {
   return <div>{children}</div>;
 };
});


describe('RootLayout', () => {
 const mockUsePathname = require('next/navigation').usePathname;


 it('does not render Navigation on the information page', () => {
   mockUsePathname.mockReturnValue('/information');
   render(<RootLayout><div>Test Child</div></RootLayout>);
   expect(screen.queryByText('Navigation')).toBeNull();
 });


 it('renders Navigation on other pages', () => {
   mockUsePathname.mockReturnValue('/other-page');
   render(<RootLayout><div>Test Child</div></RootLayout>);
   expect(screen.getByText('Navigation')).toBeInTheDocument();
 });


 it('renders children correctly', () => {
   render(<RootLayout><div>Test Child</div></RootLayout>);
   expect(screen.getByText('Test Child')).toBeInTheDocument();
 });
});
