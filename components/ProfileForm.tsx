"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUser } from '../hooks/useUser';
import { useRouter } from 'next/navigation';
import { supabase } from "@/utils/supabase/server";
import { State } from "@/types";
import { getSession } from "@/lib";

interface ProfileInfo {
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string; // Change type to string as zip codes can contain non-numeric characters
}

export default function SignUp() {
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileInfo>();
  const [states, setStates] = useState<State[]>([]);

  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    // Define an asynchronous function inside the effect
    async function fetchStates() {
      const { data , error } = await supabase.from('states').select();
      
      if (error) {
        console.error('Error fetching states:', error);
      } else {
        setStates(data);
      }
    }
    fetchStates();
  }, []);


  const onSubmit: SubmitHandler<ProfileInfo> = (data) => {
    // Save profile information using the useUser hook
    user.setUserName(data.name);
    user.setUserAddress1(data.address1)
    user.setUserAddress2(data.address2)
    user.setUserCity(data.city)
    user.setUserState(data.state)
    user.setUserZip(data.zip)

    
    // Redirect to the profile page
    router.push('/profile');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          {...register("name", { required: true, maxLength: 50 })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Full Name"
        />
        {errors.name && (
  <p className="text-red-500 text-xs italic">
    {errors.name.type === "required"
      ? "Required."
      : "At most 50 characters."
    }
  </p>
)}
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="address1"
        >
          Address 1 <span className="text-red-500">*</span>
        </label>
        <input
          {...register("address1", { required: true, maxLength: 100 })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="address1"
          type="text"
          placeholder="Address 1"
        />
        {errors.address1 && (
  <p className="text-red-500 text-xs italic">
    {errors.address1.type === "required"
      ? "Required."
      : "At most 100 characters."
    }
  </p>
)}
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="address2"
        >
          Address 2
        </label>
        <input
          {...register("address2", { maxLength: 100})}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="address2"
          type="text"
          placeholder="Address 2"
        />
        {errors.address2 && (
  <p className="text-red-500 text-xs italic">
    {errors.address2.type === "maxLength"
      ? "At most 100 characters."
      : ""
    }
  </p>
)}
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="city"
        >
          City <span className="text-red-500">*</span>
        </label>
        <input
          {...register("city", { required: true, maxLength: 100 })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="city"
          type="text"
          placeholder="City"
        />
        {errors.city && (
  <p className="text-red-500 text-xs italic">
    {errors.city.type === "required"
      ? "Required."
      : "At most 100 characters."
    }
  </p>
)}
      </div>

      <div className="flex mb-4">
        {/* State field */}
        <div className="w-1/2 pr-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="state"
          >
            State <span className="text-red-500">*</span>
          </label>
          <select
            {...register("state", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="state"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.id} value={state.state_abbreviation}>
                {state.state_abbreviation}
              </option>
            ))}
          </select>
          {errors.state && <p className="text-red-500 text-xs italic">Required.</p>}
        </div>
        {/* ZIP field */}
        <div className="w-1/2 pl-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="zip"
          >
            ZIP <span className="text-red-500">*</span>
          </label>
          <input
            {...register("zip", { required: true, maxLength: 9, minLength: 5 })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="zip"
            type="text"
            placeholder="ZIP"
          />
          {errors.zip && (
    <p className="text-red-500 text-xs italic">
      {errors.zip.type === "required"
        ? "Required."
        : errors.zip.type === "maxLength"
        ? "At most 9 characters."
        : "At least 5 characters."
      }
    </p>
  )}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
