"use client"
import Navbar from "@/components/NavBar"
import { useUser } from "@/hooks/useUser"


export default function dashboard() {
    const user = useUser()
    user.setUserID("Cruz")

    return (
        <>
        <Navbar user={user}/>
        <div className="max-w-sm bg-peach-200 rounded-lg border border-gray-200 shadow-md w-full">
      <div className="flex flex-col items-center p-5">
        <div className="mb-3">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
            {/* Placeholder for avatar */}
            <span className="text-gray-500 text-2xl">👤</span>
          </div>
        </div>
        <h5 className="mb-1 text-xl font-medium text-gray-900">React Next.js Developer</h5>
        <span className="text-sm text-gray-500">Web Developer</span>
        
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-5 py-3">
            <dt className="text-sm font-medium text-gray-500">Email</dt>
            <dd className="text-sm text-gray-900">email@example.com</dd>
          </div>
          <div className="px-5 py-3">
            <dt className="text-sm font-medium text-gray-500">Phone</dt>
            <dd className="text-sm text-gray-900">123-456-7890</dd>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <dt className="text-sm font-medium text-gray-500">Quotes</dt>
            <dd className="text-sm text-gray-900">"Innovation distinguishes between a leader and a follower."</dd>
          </div>
          <div className="px-5 py-3">
            <dt className="text-sm font-medium text-gray-500">Recent</dt>
            <dd className="text-sm text-gray-900">"The only way to do great work is to love what you do."</dd>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <dt className="text-sm font-medium text-gray-500">Most Viewed</dt>
            <dd className="text-sm text-gray-900">"Simplicity is the ultimate sophistication."</dd>
          </div>
        </dl>
      </div>
    </div>
        </>
    )
};
