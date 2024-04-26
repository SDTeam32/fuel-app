"use client"
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation'; // Import useRouter hook for redirection
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin'; // Import TextPlugin for text animation
import { useUser } from '../hooks/useUser';
import Login from '../components/Login';

gsap.registerPlugin(TextPlugin); // Register TextPlugin with GSAP

export default function Home() { // State to track login status
  const user = useUser();
  const [showLogin, setShowLogin] = useState(false);
  const router = useRouter(); // Access the router object

  useEffect(() => {
    // Animation for first header

    gsap.fromTo(
      '.first-header',
      { autoAlpha: 0 }, // Initial state: invisible
      { autoAlpha: 1, duration: 1.5, delay: 0.5, stagger: 0.1, ease: 'power3.out' } // Animation: fade in each letter with a slight delay
    );

    // Animation for second header
    gsap.fromTo(
      '.second-header',
      { autoAlpha: 0 }, // Initial state: invisible
      { autoAlpha: 1, duration: 1.5, delay: 0.5, stagger: 0.1, ease: 'power3.out' } // Animation: fade in each letter with a slight delay
    );

    // Animation for "Get yours today" text and button
    gsap.fromTo(
      '.text-button-container',
      { autoAlpha: 0, x: -50 }, // Initial state: invisible and moved to the left
      { autoAlpha: 1, x: 0, duration: 1, delay: 1.5, ease: 'power3.out' } // Animation: fade in and slide in from left
    );
    const checkUser = async () => {
      if (user.isLoggedIn && typeof user.userAddress1 === 'undefined') { // Check for undefined
        // If userAddress1 is undefined, log out and redirect
        await user.logoutUser(); // Assuming logoutUser is asynchronous
        router.push('/'); // Redirect after logging out
      }
    };

    checkUser(); // Call the asynchronous function to check user address
  }, []);

  const handleQuote = () => {
    router.push("/dashboard");
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  return (
    <>
      <div style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: 0, // Adjust the zIndex to ensure it's behind the header
      }}>
        <Image
          src="/images/background.jpg"
          alt="City Background"
          layout="fill"
          objectFit="cover"
          className="filter brightness-50"
        />
      </div>

      <div className="fixed z-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-7xl font-bold">
        {/* First Header */}
        <h1 className="mb-4">
          {Array.from('Instant Quotes').map((letter, index) => (
            <span key={index} className="first-header">{letter}</span>
          ))}
        </h1>
        {/* Second Header */}
        <h1>
          {Array.from('Infinite Possibilities!').map((letter, index) => (
            <span key={index} className="second-header">{letter}</span>
          ))}
        </h1>
        {/* Text and button container */}
        <div className="flex items-center mt-4 text-button-container">
          {/* "Get yours today" text */}
          <p className="text-lg mr-4">Get yours today</p>
          {/* Button */}
          {user.isLoggedIn ? (
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-lg" onClick={handleQuote}>Request Quote</button>
          ) : (
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-lg" onClick={handleLoginClick}>Request Quote</button>
          )}
          
        </div>
      </div>
      {showLogin && <Login show={showLogin} onClose={() => setShowLogin(false)} onSuccess={() => {setShowLogin(false); user.setLoggedIn(true);}}/>}
    </>
  );
}