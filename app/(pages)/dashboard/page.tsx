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
            <div className='flex justify-between'>
                <div>
                        <Title>Quotes</Title>
                        <Text>A list of Quotes retrieved from Supabase. (not connected yet)</Text>
                        {/* <Search /> implement later*/}
                    </div>
                    <div className='flex justify-end items-end	' style={{marginLeft:"8.8rem"}}>
                        <button
                                onClick={handleNewQuote}
                                className=" flex items-center justify-center bg-blue-500 w-28 h-8 rounded"
                                aria-label="Add new quote"
                        >
                            <img src='/imagess/plusBtn2.png' alt='notworking' className='filter invert w-5 h-5  mr-2'/>
                            <span className='text-white  text-xs align-middle  text-center	' >New Quote</span>
                        </button>
                </div>
            </div>
                
               
            <Card className="mt-6" style={{marginTop:".5rem"}}>
                <QuotesTable quotes={quotes} />
            </Card>
            <Modal show={showQuote} onClose={() => setShowQuote(false)}>
                <FuelQuote />
            </Modal>
        </main>
        
    )
};
