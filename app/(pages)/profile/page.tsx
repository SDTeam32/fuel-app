import Navbar from "@/components/NavBar";
import { userAgent } from "next/server";

export default function Profile() {

    return (
        <>
            <Navbar user={{}}/>
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-xl font-bold text-gray-900 mb-2">Welcome, USERNAME</h1>
                <h2 className="text-lg text-gray-700 mb-4">User Information</h2>
                <div className="mt-4">
                  <p className="text-gray-600"><span className="font-semibold">Address:</span> 123 main st</p>
                  <p className="text-gray-600"><span className="font-semibold">City:</span> Houston</p>
                  <p className="text-gray-600"><span className="font-semibold">State:</span> TX</p>
                  <p className="text-gray-600"><span className="font-semibold">ZIP:</span> 77021</p>
                </div>
            </div>


        </>
    )
};
