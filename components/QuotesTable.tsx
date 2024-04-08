import Modal from './Modal';
import QuotesDetail from './QuotesDetail';
import React, { useState } from 'react';
import { QuoteInput, Quote } from '@/types';

import {
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text
  } from '@tremor/react';
  
  // interface Quote {
  //   id: number;
  //   dateCreated: string;
  //   noGallons: string;
  //   rate: string; //maybe change to number
  //   totalPrice:string
  // }

  
  export default function QuotesTable({ quotes }: { quotes: Quote[] }) {
    const [showDetail, setShowDetail] = useState(false)
    const [currentQuote, setCurrentQuote] = useState<Quote | undefined>()
    const handleDetail = (quote: Quote) => {
      setCurrentQuote(quote)
      setShowDetail(!showDetail)
    }
  
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
            <TableRow key={quote.id} onClick={() => handleDetail(quote)} className='hover:bg-gray-100 cursor-pointer'>
              <TableCell>{quote.date_created}</TableCell>
              <TableCell>
                <Text>{quote.gallons_req}</Text>
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
        <Modal show={showDetail} onClose={() => setShowDetail(false)}>
        {currentQuote && <QuotesDetail key={currentQuote.id} quote={currentQuote} />}
        </Modal>
      </Table>
    )
  }
  