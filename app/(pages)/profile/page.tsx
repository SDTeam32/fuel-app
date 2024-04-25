"use client"

import { useUser } from "../../../hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Profile() {
    const router = useRouter()

    const user = useUser()
    
    
    return (
        <>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-xl font-bold text-gray-900 mb-2">Welcome, {user.userID}</h1>
                <h2 className="text-lg text-gray-700 mb-4">User Information</h2>
                <div className="mt-4">
                  <p className="text-gray-600"><span className="font-semibold">Address:</span> {user.userAddress1}</p>
                  <p className="text-gray-600"><span className="font-semibold">City:</span> {user.userCity}</p>
                  <p className="text-gray-600"><span className="font-semibold">State:</span> {user.userState}</p>
                  <p className="text-gray-600"><span className="font-semibold">ZIP:</span> {user.userZip}</p>
                  <p className="text-gray-600"><span className="font-semibold">Country:</span> {user.userAddress1}</p>
                </div>
            </div>
            <button  className="bg-blue-500 p-4" onClick={()=>router.push('/dashboard')} >dashboard</button>


        </>
    )
};
