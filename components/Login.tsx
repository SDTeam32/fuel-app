import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/navigation'
import { supabase } from "../utils/supabase/server";
import { useUser } from "../hooks/useUser";
import { Customer, User } from "../types";
import bcrypt from 'bcryptjs'


interface LoginInput {
  username: string;
  password: string;
}

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onSuccess: () => void;
}


export default function Login({ show, onClose, onSuccess }:ModalProps) {
  if (!show) {
    return null;
  }
  const { register, handleSubmit, watch, formState: { errors }, } = useForm<LoginInput>();
  const [errorMessage] = useState<string>('');
  const router = useRouter()
  const user = useUser()



  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    try {
      const {data: userCred, error: err} = await supabase
        .from('credentials')
        .select<any, User>()
        .eq(`username`, data.username)
        .single()

      if (err){ 
        throw new Error("Username does not exist")
      }
      const passwordIsValid = bcrypt.compareSync(data.password, userCred.password)
    //TODO: REMOVE HARDCODED VALUES
      if(passwordIsValid) {
        const {data: userInfo, error: e} = await supabase
          .from("customers")
          .select<any, Customer>()
          .eq('id', userCred.user_id)
          .single()
        if(e) {
          throw e
        }
        user.setUser(userInfo) // sets all variables
        onSuccess();
        router.push('/profile');

      }

    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <div 
      data-testid="backdrop"
      className="fixed inset-0 m-12 p-10 z-10" id="my-modal" onClick={onClose} style={{backgroundColor: "rgba(0,0,0,0.5)", margin: "0"}}> 
      <div className=" bg-gray-100 relative top-1/4 mx-auto p-5 border w-11/12 md:max-w-md shadow-lg rounded-md "  onClick={e => e.stopPropagation()} >
          <div className="items-center px-4 py-3">
            <div className="flex justify-end">
                <button
                    id="ok-btn"
                    data-testid="close-modal-button"
                    className=" "
                    onClick={onClose}
                    >
                    <img className="block w-6 h-6" src="/images/closeIMG.png" alt="notWorking"/>
                </button>
            </div>
            <div className="mt-3 text-center">
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
                    Username<span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register("username", { required: true, maxLength: 20, minLength: 3 })}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                      errors.username ? 'border-red-500' : ''
                    }`}
                    data-testid="username"
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
                      errors.password ? 'border-red-500' : ''
                    }`}
                    data-testid="password"
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
            </div>
          </div>
      </div>
    </div>

  );
}