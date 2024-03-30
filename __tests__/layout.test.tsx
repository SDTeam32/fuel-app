import { render } from '@testing-library/react';
import RootLayout from '../app/layout';

// Mock the CSS file directly
jest.mock('../app/globals.css', () => ({}));

// Mock the Inter function
jest.mock('next/font/google', () => ({
  Inter: jest.fn().mockReturnValue({ className: 'mocked-inter-class' }),
}));

describe('RootLayout', () => {
  test('renders without crashing', () => {
    // Render the RootLayout component
    render(<RootLayout>Hello</RootLayout>);
    
    // Add your assertions here
  });
});
