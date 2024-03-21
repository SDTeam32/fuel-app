"use client";
import React, { useRef } from "react";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { useUser } from '../hooks/useUser';
import { useRouter } from 'next/navigation'


interface profileInfo {
  name: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: number;
  username: string;
}

export default function SignUp() {
  const { register, handleSubmit, watch, formState: { errors }, } = useForm<profileInfo>();
  const user = useUser(); // Destructure setUserID from the useUser hook
  const router = useRouter()
  const onSubmit: SubmitHandler<profileInfo> = (data) => {
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" wd-80 shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
        <div className="mt-3 text-center">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          {...register("username")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Password
        </label>
        <input
          {...register("name", {
            required: true,
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="string"
          placeholder="Full Name"
        />
      </div>      
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
      </div>
    </form>
  );
}