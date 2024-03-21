"use client";
import React, { useRef } from "react";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { useUser } from '../hooks/useUser';
import { useRouter } from 'next/navigation'


interface SignupInput {
  username: string;
  password: string;
  password2: string;
}

export default function SignUp() {
  const { register, handleSubmit, watch, formState: { errors }, } = useForm<SignupInput>();
  const user = useUser(); // Destructure setUserID from the useUser hook
  const router = useRouter()
  const onSubmit: SubmitHandler<SignupInput> = (data) => {
    user.setUserID(data.username); // Save the username as the userID
    user.setUserID(data.password);
    router.push('/profile')
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" wd-80 shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
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
          placeholder="Username"
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
          {...register("password", {
            required: true,
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="string"
          placeholder="Password"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Confirm Password
        </label>
        <input
          {...register("password2", {
            required: true,
            validate: (val: string) => {
              if (watch("password") !== val) {
                return "Your passwords do not match"; // Return an error message if passwords don't match
              }
            },
          })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.password2 ? "border-red-500" : "" // Add border color if there's an error
          }`}
          id="passwrod2"
          type="string"
          placeholder="Confirm Password"
        />
        {errors.password2 && (
          <p className="text-red-500 text-xs italic">
            {errors.password2.message}
          </p>
        )}
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