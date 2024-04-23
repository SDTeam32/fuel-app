"use client"
import { useState, useEffect, useCallback } from 'react';
import QuotesTable from '../../../components/QuotesTable';
import FuelQuote from '@/components/FuelQuote';
import Modal from '@/components/Modal';
import { Card, Title, Text, Button } from '@tremor/react';
import { Quote, QuoteInput } from '../../../types';
import { useUser } from '../../../hooks/useUser';
import { supabase } from '../../../utils/supabase/server';
import Image from "next/image";



const date = new Date().toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });

export default function Dashboard() {

    const [showQuote, setShowQuote] = useState(false)
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const user = useUser()
    
    const getQuotes = useCallback(async () => {
        //TODO: REMOVE HARDCODED VALUE
        const {data, error} = await supabase.from("quote").select<any, Quote>().eq("user_id", user.userNumber) 
        if(error) {
            throw error
        }

        setQuotes([...data ])
    }, [])

    useEffect(()=> {
        getQuotes()
            .catch(console.error)

    }, [getQuotes])
    
    const handleQuoteSubmission = async (quote: Quote) => {
        const userid = user.userNumber
        
        try {
            const { data, error } = await supabase.from("quote").insert([{
                ...quote,
                user_id: userid,
                date_created: new Date().toLocaleDateString()
            }]).select()
            
            if(error) {
                throw error
            }
            const instertedQuote = data[0]
            console.log("quote inserted successfully", instertedQuote)

            // Add the new quote to the existing quotes
            setQuotes(prevQuotes => [...prevQuotes, instertedQuote]);

        } catch (error) {
            console.error("Error inserting quote:", error)
        }
    
    };
    const handleNewQuote = () => {
        setShowQuote(!showQuote)
    }


 
    
    //const quotes: QuoteInput[] = [{id:id, dateCreated: date, gallonsReq: 64, sugPrice: 2.42, totalPrice:232}]
    
    return (
        <>
        <div
      className="relative block group"
      style={{
        display: "block",
        width: "100vw",
        minHeight: "100vh", // Ensure the page is at least as tall as the viewport
        overflow: "hidden",
        position: "relative" // Ensure the container has relative positioning
      }}
    >
      {/* Background overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
        style={{ zIndex: -1 }} // Ensure the overlay is behind the image
      />
    
      {/* Image */}
      <div className="absolute top-0 left-0 w-full h-full" style={{ zIndex: -2 }}>
        <Image
          src="/images/background.jpg"
          layout="fill"
          objectFit="cover"
          alt="Background Image"
        />
      </div>
            <main className="px-4 md:p-10 mx-auto max-w-7xl bg-gray-50 pt-10">
                <div className='flex justify-between'>
                    <div>
                            <Title>Quotes</Title>
                            
                            {/* <Search /> implement later*/}
                        </div>
                        <div className='flex justify-end items-end	' style={{marginLeft:"8.8rem"}}>
                            <button
                                    data-testid="newquote"
                                    onClick={handleNewQuote}
                                    className=" flex items-center justify-center bg-blue-500 w-28 h-8 rounded"
                                    aria-label="Add new quote"
                            >
                                <img src='/images/plusBtn2.png' alt='notworking' className='filter invert w-5 h-5  mr-2'/>
                                <span className='text-white  text-xs align-middle  text-center	' >New Quote</span>
                            </button>
                    </div>
                </div>
                    
                
                <Card className="mt-6" style={{marginTop:".5rem"}}>
                    <QuotesTable quotes={quotes} />
                </Card>
                <Modal show={showQuote} onClose={() => setShowQuote(false)}>
                    <FuelQuote sendQuote={handleQuoteSubmission} />
                </Modal>
            </main>
            </div>
        </>
    )
};
