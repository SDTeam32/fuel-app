import Modal from './Modal';
import QuotesDetail from './QuotesDetail';
import React, { useState } from 'react';

import {
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text
  } from '@tremor/react';
  
  interface Quote {
    id: number;
    dateCreated: string;
    noGallons: string;
    rate: string; //maybe change to number
    totalPrice:string
  }

  
  export default function QuotesTable({ quotes }: { quotes: Quote[] }) {
    const [showDetail, setShowDetail] = useState(false)
    const handleDetail = () => {
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
            <TableRow key={quote.id} onClick={() => handleDetail()} className='bg-black'>
              <TableCell>{quote.dateCreated}</TableCell>
              <TableCell>
                <Text>{quote.noGallons}</Text>
              </TableCell>
              <TableCell>
                <Text>{quote.rate}</Text>
              </TableCell>
              <TableCell>
                <Text>{quote.totalPrice}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <Modal show={showDetail} onClose={() => setShowDetail(false)}>
          <QuotesDetail/>
        </Modal>
      </Table>
    )
  }
  