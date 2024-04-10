"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation'
import { getSession, logout } from "@/lib"; // Import useUser hook
import Login from "./Login";
import SignUp from "./Signup"; // Import the SignUp component
import { useUser } from "@/hooks/useUser";

function isActive(route: string) {
  const pathname = usePathname()
  return pathname === route ? 'text-blue-500' : 'dark:text-white';
}

export default function Navigation() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false); // State to control SignUp component visibility
  const { isLoggedIn, setLoggedIn } = useUser(); // Use isLoggedIn state from useUser hook
  const router = useRouter()

  useEffect(() => {
    async function checkSession() {
      const session = await getSession();
      setLoggedIn(!!session); // Update isLoggedIn using setLoggedIn from useUser hook
    }
    checkSession();
  }, [setLoggedIn]); // Listen for changes in setLoggedIn
  
  const handleLogout = async () => {
    await logout();
    setLoggedIn(false); // Update isLoggedIn using setLoggedIn from useUser hook
    setShowLogin(false);
    setShowSignUp(false);
    router.push('/');
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleSignUpClick = () => {
    setShowSignUp(true);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 relative w-full z-2 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="images/logo.png" className="h-14" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              T32 Fuel
            </span>
          </div>
        </Link>
        <div className="flex order-2  space-x-0 rtl:space-x-reverse">
          {/* Conditional rendering for SignUp, Login, and Logout buttons */}
          {!isLoggedIn && (
            <>
              <button
                onClick={handleSignUpClick} // Show SignUp component on click
                type="button"
                className="text-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:border-gray-600 dark:text-blue-600 dark:hover:bg-blue-700 dark:hover:text-white dark:focus:ring-blue-800"
              >
                Sign Up
              </button>
              <button
                onClick={handleLoginClick} // Show Login component on click
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Log in
              </button>
            </>
          )}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              type="button"
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
            >
              Logout
            </button>
          )}
          {/* Conditional rendering for SignUp and Login components */}
          {showLogin && <Login show={showLogin} onClose={() => setShowLogin(false)} onSuccess={() => {setShowLogin(false); setLoggedIn(true);}}/>}
          {showSignUp && <SignUp show={showSignUp} onClose={() => setShowSignUp(false)} onSuccess={() => {setShowSignUp(false); setLoggedIn(true);}}/>}
        </div>
        
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link href="/">
                <div
                  className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${isActive('/')}`}
                  aria-current="page"
                >
                  Home
                </div>
              </Link>
            </li>
            <li>
              <Link href="/dashboard">
                <div
                  className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${isActive('/dashboard')}`}
                >
                  Dashboard
                </div>
              </Link>
            </li>
            <li>
              <Link href="/profile">
                <div
                  className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${isActive('/profile')}`}
                >
                  Profile
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
