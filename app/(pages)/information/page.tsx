"use client"
import Image from "next/image";
import { useState } from 'react';
import { useUser } from '../../../hooks/useUser';
import ProfileForm from "@/components/ProfileForm";

export default function profile() {
  const user = useUser();
    console.log("Current userID:", user.userID);
  return (
    <a
    className="relative block group z-2"
    style={{
      display: "block",
      width: "100vw",
      height: "100vh",
      overflow: "hidden",
      position: "relative", // Ensure the container has relative positioning
    }}
  >
    {/* Background overlay */}
    <div
      className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
      style={{ zIndex: -1 }} // Ensure the overlay is behind the image
    ></div>

    {/* Image */}
    <div className="absolute top-0 left-0 w-full h-full" style={{ zIndex: -2 }}>
      <Image
        src="/images/background.jpg"
        layout="fill"
        objectFit="cover"
        alt="Background Image"
      />
    </div>

    
    <div className=" fixed inset-0 m-12 p-10"> 
              <div className=" bg-gray-100 relative top-1/4 mx-auto p-5 border w-11/12 md:max-w-md shadow-lg rounded-md ">
              <div className="items-center px-4 py-3">
              <div className="text-center block text-gray-700 text-2xl font-bold mb-2">Profile Dashboard</div>
                <div className="flex justify-end">
                </div>
                <div className="mt-3 text-center">
                    Form Component Goes Here
                </div>
              </div>
          </div>
        
        </div>
  </a>

  
  

  )
};