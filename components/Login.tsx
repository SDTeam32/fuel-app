"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { useUser } from '../hooks/useUser';
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase/server';


interface LoginInput {
  username: string;
  password: string;
}

export default function SignUp() {
  const { register, handleSubmit, watch, formState: { errors }, } = useForm<LoginInput>();
  const user = useUser(); // Destructure setUserID from the useUser hook
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState<string>('');
  const bcrypt = require('bcryptjs');

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    try {
      const { data: userData, error: userError } = await supabase
        .from('credentials')
        .select('password')
        .eq('username', data.username)
        .single();

      if (userError || !user) throw new Error("Username does not exist")

      const passwordIsValid = await bcrypt.compareSync(data.password, userData.password)

      if(passwordIsValid) {
        console.log("User logged in suzzessfully");
        user.setUserName(data.username);
        router.push('/profile');
      }
    } catch (error) {
      setErrorMessage("Failed to log in. Please check your username and password.");
      console.error("Login error", error);
    }
};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" wd-80 shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
    <div className="text-center block text-gray-700 text-2xl font-bold mb-2">Log In</div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username
        </label>
        <input
          {...register("username", { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Username"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          {...register("password", { required: true })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="Password"
        />
      </div>
      {errorMessage && (
        <p className="text-red-500 text-xs italic mb-4">{errorMessage}</p>
      )}
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