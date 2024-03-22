"use client"
import Image from "next/image";
import { useState } from 'react';
import { useUser } from '../../../hooks/useUser';
import ProfileForm from "@/components/ProfileForm";

export default function profile() {
  const user = useUser();
  console.log("Current userID:", user.userID);
  
  return (
    <div
      className="relative block group"
      style={{
        display: "block",
        width: "100vw",
        minHeight: "100vh", // Ensure the page is at least as tall as the viewport
        overflow: "hidden",
        position: "relative" // Ensure the container has relative positioning
      }}
    >
      {/* Background overlay */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
        style={{ zIndex: -1 }} // Ensure the overlay is behind the image
      />
    
      {/* Image */}
      <div className="absolute top-0 left-0 w-full h-full" style={{ zIndex: -2 }}>
        <Image
          src="/images/background.jpg"
          layout="fill"
          objectFit="cover"
          alt="Background Image"
        />
      </div>

      {/* Profile form container */}
      <div className="relative m-12 p-10">
        <div className="bg-gray-100 relative top-1/4 mx-auto p-5 border w-11/12 md:max-w-md shadow-lg rounded-md">
          <div className="items-center px-4 py-3">
            <div className="text-center block text-gray-700 text-2xl font-bold mb-2">Complete Profile</div>
            <div className="flex justify-end" />
            <div className="mt-3 text-center">
              <ProfileForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
