"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { Quote, QuoteInput } from "../types";
import { useUser } from "../hooks/useUser";
import { supabase } from "../utils/supabase/server";
interface FuelQuoteProps {
  sendQuote: (data: Quote) => void;
}

export default function FuelQuote({ sendQuote }: FuelQuoteProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Quote>();

  const user = useUser();
  const additionalAddress = user.userAddress2 ? ` ${user.userAddress2}` : '';
  const fakeAddress: string = `${user.userAddress1} ${additionalAddress}, ${user.userCity}, ${user.userZip}, ${user.userState}` ? "test address" : "";
  const suggestedPrice: number = 1.5;
  const gallonsRequested = watch("gallons_req",0) || 32;
  const dateRequested= watch('delivery_date') || "10/10/2024";
  const [totalPrice, setTotalPrice] = useState(0);
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
      setValue("delivery_addr", fakeAddress);
    
  }, [setValue]);

  const calculateTotalPrice = async (gallons: number) => {
    const locationFactor = user.userState === "TX" ? 0.02 : 0.04;
    const { data: quoteHistory } = await supabase.from("quote").select("*").eq("user_id", user.userNumber).single();
    console.log(quoteHistory)
    const rateHistoryFactor = quoteHistory ? 0.01 : 0;
    const gallonsRequestedFactor = gallons > 1000 ? 0.02 : 0.03;

    const margin = (locationFactor - rateHistoryFactor + gallonsRequestedFactor + 0.1) * suggestedPrice;
    const actualPrice = suggestedPrice + margin;

    const price = (gallons * actualPrice).toFixed(2);
    return parseFloat(price);
  };

  const getQuote = async () => {
    const newTotalPrice = await calculateTotalPrice(gallonsRequested);
    setTotalPrice(newTotalPrice); // Set state to trigger re-render
    setShowButton(true);
  };

  const onSubmit: SubmitHandler<Quote> = (data: Quote) => {
    data.gallons_req = Number(data.gallons_req);
    data.sug_price = suggestedPrice;
    data.total_price = totalPrice;

    sendQuote(data);
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} 
          className=" wd-80 shadow-md rounded px-8 pt-6 pb-8 mb-4" data-testid="form">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gallonsReq">
          Gallons Requested
        </label>
        <input {...register("gallons_req", { required: "Please Fill Gallons Requested" })} 
          
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          id="gallonsReq" type="number" placeholder="placeholder1"
          data-testid="gallons_req" />
        {errors.gallons_req && <p className="text-red-500 text-xs italic">{errors.gallons_req?.message}</p>}
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="delivery_addr">
          Delivery Address
        </label>
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
              isFutureDate: (value: any) => new Date(value) > new Date() || "Date must be in the future",
            },
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="delivery_addr"
          type="date"
          data-testid="date"
          placeholder="placeholder2"
        />
        {errors.delivery_date && <p className="text-red-500 text-xs italic">{errors.delivery_date.message}</p>}
      </div>{" "}
      <br />
      <label className="block text-gray-700 text-sm font-bold mb-2"> Suggested Price </label>
      <span className="text-black">{suggestedPrice}</span>
      <br />
      <label className="block text-gray-700 text-sm font-bold mb-2"> Total Price </label>
      <span className="text-black">{totalPrice}</span>
      <div className="flex justify-center">
        {gallonsRequested && dateRequested && (
          <>
              <button 
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => getQuote()}
                  style={{ marginRight: '10px' }}  // Adds margin to the right of the "Get Quote" button
              >Get Quote</button>
              {showButton && <button 
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                  Submit
              </button>}
          </>
        )}
      </div>
    </form>
  );
}
