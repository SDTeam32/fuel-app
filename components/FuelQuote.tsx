"use client"
import {useForm, SubmitHandler} from "react-hook-form"

interface QuoteInput {
    gallonsReq: number
    deliveryAddr: string
    deliveryDate: string
}

export default function FuelQuote() {
    const {register, handleSubmit} = useForm<QuoteInput>()
    const onSubmit: SubmitHandler<QuoteInput> = (data) => {
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
                <input {...register("gallonsReq")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="gallonsReq" type="number" placeholder="Gallons requested"/>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deliveryAddr">
                Delivery Address
                </label>
                <input {...register("deliveryAddr")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="deliveryAddr" type="text" placeholder="1234 Main St"/>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deliveryAddr">
                Delivery Date
                </label>
                <input {...register("deliveryDate")}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="deliveryAddr" type="date" />
            </div>
            <span className="text-black">suggested price</span><br/>
            <span className="text-black"> total amount due</span>
            <div className="flex items-center justify-between">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Submit
                </button>
            </div>
            
        </form>

    )
};
