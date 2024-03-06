import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../components/Modal';

describe('<Modal />', () => {
    // Test 1: Modal renders when 'show' is true
    it('renders the modal when "show" is true', () => {
      render(
        <Modal show={true} onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>
      );
  
      expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });
  
    // Test 2: Modal does not render when 'show' is false
    it('does not render the modal when "show" is false', () => {
      render(
        <Modal show={false} onClose={() => {}}>
          <div>Modal Content</div>
        </Modal>
      );
  
      expect(screen.queryByText('Modal Content')).toBeNull();
    });
  
    // Test 3: onClose is called when clicking the backdrop
    it('calls "onClose" when the backdrop is clicked', () => {
      const mockOnClose = jest.fn();
      render(
        <Modal show={true} onClose={mockOnClose}>
          <div>Modal Content</div>
        </Modal>
      );
  
      fireEvent.click(screen.getByTestId('backdrop'));
      expect(mockOnClose).toHaveBeenCalled();
    });
  
    // Test 4: onClose is called when clicking the close button
    it('calls "onClose" when the close button is clicked', () => {
      const mockOnClose = jest.fn();
      render(
        <Modal show={true} onClose={mockOnClose}>
          <div>Modal Content</div>
        </Modal>
      );
  
      fireEvent.click(screen.getByAltText('notWorking'));
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
  