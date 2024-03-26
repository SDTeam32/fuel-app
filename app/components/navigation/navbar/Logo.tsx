"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const Logo = () => {
  return (
      <Link href="/">
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
      </Link>
  );
};

export default Logo;
