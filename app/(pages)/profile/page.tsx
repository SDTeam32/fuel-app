"use client"
import Navbar from "@/components/NavBar";
import { userAgent } from "next/server";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

export default function Profile() {
    const user = useUser()
    const router = useRouter()
    
    return (
        <>
            <Navbar/>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-xl font-bold text-gray-900 mb-2">Welcome, {user.userID}</h1>
                <h2 className="text-lg text-gray-700 mb-4">User Information</h2>
                <div className="mt-4">
                  <p className="text-gray-600"><span className="font-semibold">Address:</span> {user.userAddress1}</p>
                  <p className="text-gray-600"><span className="font-semibold">City:</span> {user.userCity}</p>
                  <p className="text-gray-600"><span className="font-semibold">State:</span> {user.userState}</p>
                  <p className="text-gray-600"><span className="font-semibold">ZIP:</span> {user.userZip}</p>
                </div>
            </div>
            <button  className="bg-blue-500 p-4" onClick={()=>router.push('/dashboard')} >dashboard</button>


        </>
    )
};
