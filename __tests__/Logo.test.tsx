// __mocks__/next/image.js
type ImageProps = {
    src: string;
    alt: string;
    width: number;
    height: number;
    layout?: 'fill' | 'fixed' | 'intrinsic' | 'responsive';
    objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
    objectPosition?: string;
  };
  
  const MockImage: React.FC<ImageProps> = (props) => {
    return <img {...props} />;
  };
  
export default MockImage;
jest.mock('next/image', () => require('../__mocks__/next/image').default);

import React from 'react';
import { render, screen } from '@testing-library/react';
import Logo from '@/app/components/navigation/navbar/Logo';

describe('<Logo />', () => {
  it('renders the logo with correct alt text', () => {
    render(<Logo />);
    const logoImage = screen.getByAltText('Vercel Logo');
    expect(logoImage).toBeInTheDocument();
  });

  it('renders the logo with correct dimensions', () => {
    render(<Logo />);
    const logoImage = screen.getByAltText('Vercel Logo');
    expect(logoImage).toHaveAttribute('width', '100');
    expect(logoImage).toHaveAttribute('height', '24');
  });

  // Add more tests as needed
});
