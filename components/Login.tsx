import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from 'next/navigation'
import { login } from "@/lib";


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
  const router = useRouter()
  const [errorMessage] = useState<string>('');

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    try {
      await login(data.username, data.password);
      onSuccess();
      router.push('/profile');
    } catch (error) {
      console.error("Login error", error);
    }
};

  return (
    <div 
          data-testid="backdrop"
          className="fixed inset-0 m-12 p-10" id="my-modal" onClick={onClose} style={{backgroundColor: "rgba(0,0,0,0.5)", margin: "0"}}> 
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
                </div>
              </div>
          </div>
        </div>
  );
}