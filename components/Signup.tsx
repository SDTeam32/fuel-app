import React, { useRef } from "react";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { useUser } from '../hooks/useUser';
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase/server';


interface SignupInput {
  username: string;
  password: string;
  password2: string;
}

export default function SignUp() {
  const { register, handleSubmit, watch, formState: { errors }, } = useForm<SignupInput>();
  const user = useUser();
  const router = useRouter();
  const bcrypt = require('bcryptjs');

  const onSubmit: SubmitHandler<SignupInput> = async (info) => {
    try {
        const saltRounds = 10;
        // Corrected to include saltRounds in the hashSync method
        const hash = bcrypt.hashSync(info.password, saltRounds);
        const { data, error } = await supabase.from("credentials").insert([{ username: info.username, password: hash }]).select();
        
        if (error) {
          throw error
        };
        user.setUserNumber(data[0].user_id)
        console.log("Username and Password Inserted Successfully");

        // Assuming you're handling session or user state elsewhere
        // user.setUserName(data.username);
        // user.setUserCode(data.password);

        router.push('/information');
    } catch (error) {
      console.error("Error Signing Up", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="wd-80 shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
    <div className="text-center block text-gray-700 text-2xl font-bold mb-2">Sign Up</div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Username<span className="text-red-500">*</span>
        </label>
        <input
          {...register("username", { required: true, maxLength: 20, minLength: 3 })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.username ? "border-red-500" : ""
          }`}
          id="username"
          type="text"
          placeholder="Username"
        />
        {errors.username && (
        <p className="text-red-500 text-xs italic">
          {errors.username.type === "required"
            ? "Required."
            : errors.username.type === "maxLength"
            ? "At most 20 characters."
            : "At least 3 characters."
          }
        </p>
      )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password<span className="text-red-500">*</span>
        </label>
        <input
          {...register("password", { required: true, minLength: 8,  maxLength: 50 })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.password ? "border-red-500" : ""
          }`}
          id="password"
          type="password"
          placeholder="Password"
        />
        {errors.password && (
        <p className="text-red-500 text-xs italic">
          {errors.password.type === "required"
            ? "Required."
            : errors.password.type === "maxLength"
            ? "At most 50 characters."
            : "At least 8 characters."
          }
        </p>
      )}
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password2"
        >
          Confirm Password<span className="text-red-500">*</span>
        </label>
        <input
          {...register("password2", {
            required: true, minLength: 8, maxLength: 50,
            validate: (val: string) => {
              if (watch("password") !== val) {
                return "Your passwords do not match";
              }
            },
          })}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.password2 ? "border-red-500" : ""
          }`}
          id="password2"
          type="password"
          placeholder="Confirm Password"
        />
        {errors.password2 && (
        <p className="text-red-500 text-xs italic">
          {errors.password2.type === "required"
            ? "Required."
            : errors.password2.type === "maxLength"
            ? "At most 50 characters."
            : "At least 8 characters."
          }
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
