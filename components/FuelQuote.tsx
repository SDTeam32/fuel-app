"use client"
import {useForm, SubmitHandler} from "react-hook-form"
import { useEffect } from "react"
import { QuoteInput } from "@/types"

// interface QuoteInput {
//     gallonsReq: number
//     deliveryAddr: string
//     deliveryDate: string
//     sugPrice: number
//     totalPrice: number
// }
interface FuelQuoteProps {
    sendQuote: (data: QuoteInput) => void;
}

export default function FuelQuote({ sendQuote }: FuelQuoteProps) {
    const {register, handleSubmit, watch, setValue, formState:{errors}} = useForm<QuoteInput>()
    const fakeAddress: string = "123 Main St, 77032 Houston TX"
    const suggestedPrice: number = 2.42
    const gallonsRequested = watch("gallonsReq",0)
    
    useEffect(() => {
        // Set the default value for deliveryAddr on component mount
        setValue('deliveryAddr', fakeAddress);
      }, [setValue]);

    const calculateTotalPrice = (gallons: number) => {
        const totalPrice:string = (gallons * suggestedPrice).toFixed(2)
        return  Number(totalPrice)
      };
    const totalPrice:number = calculateTotalPrice(gallonsRequested)

    const onSubmit: SubmitHandler<QuoteInput> = (data:QuoteInput) => {
        data.gallonsReq = Number(data.gallonsReq)
        data.sugPrice = suggestedPrice
        data.totalPrice = totalPrice

        sendQuote(data)
        //send to db logic
        //insert into quote table?
        console.log(data)
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className=" wd-80 shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gallonsReq">
                Gallons Requested
                </label>
                <input {...register("gallonsReq",{required: "Please Fill Gallons Requested"})} 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="gallonsReq" type="number" placeholder="Gallons requested"/>
                {errors.gallonsReq && <p className="text-red-500 text-xs italic">{errors.gallonsReq.message}</p>}
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deliveryAddr">
                Delivery Address
                </label>
                {fakeAddress}
                {/* <input {...register("deliveryAddr")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="deliveryAddr" type="text" placeholder="1234 Main St"/> */}
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deliveryAddr">
                Delivery Date
                </label>
                <input
                    {...register("deliveryDate", {
                        required: "Please Fill Date",
                        validate: {
                          isFutureDate: (value:any) => new Date(value) > new Date() || "Date must be in the future"
                        }
                      })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                    id="deliveryAddr" type="date" />
                {errors.deliveryDate && <p className="text-red-500 text-xs italic">{errors.deliveryDate.message}</p>}
            </div> <br/>
            <label className="block text-gray-700 text-sm font-bold mb-2"> Suggested Price  </label>
            <span className="text-black">{suggestedPrice}</span><br/>
            <label className="block text-gray-700 text-sm font-bold mb-2"> Total Price  </label>
            <span className="text-black">{totalPrice}</span>
            <div className="flex justify-center">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Submit
                </button>
            </div>
            
        </form>

    )
};
