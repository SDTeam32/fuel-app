"use client"
import { useState } from 'react';
import QuotesTable from '@/components/QuotesTable';
import FuelQuote from '@/components/FuelQuote';
import Modal from '@/components/Modal';
import { Card, Title, Text, Button } from '@tremor/react';

interface Quote {
    id: number;
    dateCreated: string;
    noGallons: string;
    rate: string; //maybe change to number
    totalPrice:string
  }

export default function dashboard() {
    const [showQuote, setShowQuote] = useState(false)
    const quotes: Quote[] = [{id:1, dateCreated:"02/23/2001", noGallons:"64", rate:"2.42", totalPrice:"154.88"}]
    const handleNewQuote = () => {
        setShowQuote(!showQuote)
        console.log("clicked")
    }
    return (
        <main className="p-4 md:p-10 mx-auto max-w-7xl">
            <Title>Quotes</Title>
            <Text>A list of Quotes retrieved from Supabase. (not connected yet)</Text>
            {/* <Search /> implement later*/}
            
            <button
                onClick={handleNewQuote}
                className="p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
                aria-label="Add new quote"
            >Add a new Quote</button>
            <Card className="mt-6">
                <QuotesTable quotes={quotes} />
            </Card>
            <Modal show={showQuote} onClose={() => setShowQuote(false)}>
                <FuelQuote />
            </Modal>
        </main>
    )
};
