"use client"
import Navigation from "@/components/Navigation";
import "./globals.css";
import { Inter } from "next/font/google";
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Check if the current page is the information page
  const isInformationPage = pathname === '/information';

  return (
    <html lang="en">
      <body className={inter.className}>
        {!isInformationPage && <Navigation/>}
        {children}
      </body>
    </html>
  );
}