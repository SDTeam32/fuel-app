import React, { useState } from 'react';
import Modal from './Modal';
import QuotesDetail from './QuotesDetail';
import { Quote } from '../types';  
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';

export default function QuotesTable({ quotes }: { quotes: Quote[] }) {
  const [modalState, setModalState] = useState<{ isVisible: boolean; currentQuote?: Quote }>({ isVisible: false });

  const toggleModal = (quote?: Quote) => {
    setModalState({
      isVisible: !modalState.isVisible,
      currentQuote: quote
    });
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Date Created</TableHeaderCell>
          <TableHeaderCell># of Gallons</TableHeaderCell>
          <TableHeaderCell>Rate</TableHeaderCell>
          <TableHeaderCell>Total Price</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {quotes.map((quote) => (
          <TableRow key={quote.id} onClick={() => toggleModal(quote)} className='hover:bg-gray-100 cursor-pointer'>
            <TableCell>{quote.date_created}</TableCell>
            <TableCell>
              <Text>{quote.gallons_req.toString()}</Text>  // Convert number to string for display
            </TableCell>
            <TableCell>
              <Text>{quote.sug_price}</Text>
            </TableCell>
            <TableCell>
              <Text>{quote.total_price}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {modalState.isVisible && modalState.currentQuote && (
        <Modal show={modalState.isVisible} onClose={() => toggleModal()}>
          <QuotesDetail key={modalState.currentQuote.id} quote={modalState.currentQuote} />
        </Modal>
      )}
    </Table>
  );
}
