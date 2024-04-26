"use client"
import Navigation from "../components/Navigation";
import "./globals.css";
import { Inter } from "next/font/google";
import { usePathname, useRouter } from 'next/navigation'
import HydrationZustand from '../components/HydrationZustand'
import { useEffect } from "react";
import { useUser } from "../hooks/useUser";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!user.isLoggedIn) {
      // If the user isn't logged in, redirect to the home page
      router.push('/');
      return; // Avoid further execution after redirection
    }

    
  });
  
  const pathname = usePathname();
  
  // Check if the current page is the information page
  const isInformationPage = pathname === '/information';

  return (
    <html lang="en">
      <body className={inter.className}>
        <HydrationZustand>
          {!isInformationPage && <Navigation/>}
          {children}
        </HydrationZustand>
        
      </body>
    </html>
  );
}