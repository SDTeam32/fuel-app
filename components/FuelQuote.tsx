import { useForm, SubmitHandler } from "react-hook-form";
import {useState, useEffect } from "react";
import { Quote } from "../types";

interface FuelQuoteProps {
    sendQuote: (data: Quote) => void;
}

export default function FuelQuote({ sendQuote }: FuelQuoteProps) {
    const { register, handleSubmit, watch, setValue, formState: { errors, isValid } } = useForm<Quote>({
        mode: 'onChange'
    });
    const [showButton, setShowButton] = useState(false)
    const fakeAddress = "123 Main St, 77032 Houston TX";
    const suggestedPrice = 2.42;
    const gallonsRequested = watch("gallons_req", 0);
    const delDate = watch('delivery_date');

    useEffect(() => {
        setValue('delivery_addr', fakeAddress);
    }, [setValue]);

    const calculateTotalPrice = (gallons: number) => {
        const totalPrice = (gallons * suggestedPrice).toFixed(2);
        return Number(totalPrice);
    };

    const totalPrice = calculateTotalPrice(gallonsRequested);

    const onSubmit = () => {
        //this function calls the pricing module
        

        setShowButton(true) //makes the getQuote button show
    };
    
    const getQuoteButton: SubmitHandler<Quote> = (data: Quote) => {
        data.gallons_req = Number(data.gallons_req);
        data.sug_price = suggestedPrice;
        data.total_price = totalPrice;
        sendQuote(data)
    }

    return (

        <form onSubmit={handleSubmit(getQuoteButton)} className=" wd-80 shadow-md rounded px-8 pt-6 pb-8 mb-4" data-testid="form">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gallonsReq">
                Gallons Requested
                </label>
                <input {...register("gallons_req",{required: "Please Fill Gallons Requested"})} 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="gallonsReq" type="number" placeholder="Gallons requested"
                    data-testid="gallons_req"/>
                {errors.gallons_req && <p className="text-red-500 text-xs italic">{errors.gallons_req?.message}</p>}

            </div>
            <div className="mb-6">
                <label htmlFor="delivery_addr" className="block text-gray-700 text-sm font-bold mb-2">Delivery Address</label>
                {fakeAddress}
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="delivery_addr">
                Delivery Date
                </label>
                <input
                    {...register("delivery_date", {
                        required: "Please Fill Date",
                        validate: {
                          isFutureDate: (value:any) => new Date(value) > new Date() || "Date must be in the future"
                        }
                      })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                    id="delivery_addr" type="date"
                    data-testid="date" />

                {errors.delivery_date && <p className="text-red-500 text-xs italic">{errors.delivery_date.message}</p>}
            </div>
            <br />
            <label className="block text-gray-700 text-sm font-bold mb-2">Suggested Price</label>
            <span className="text-black">{suggestedPrice}</span><br />
            <label className="block text-gray-700 text-sm font-bold mb-2">Total Price</label>
            <span className="text-black">{totalPrice}</span>
            <div className="flex justify-center">
                {delDate && 
                 gallonsRequested && 
                    <button 
                        onClick={()=>onSubmit()}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Submit
                    </button>
                }
                {showButton && 
                    <button 
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Get Quote
                </button>}
            </div>
        </form>
    );
}
