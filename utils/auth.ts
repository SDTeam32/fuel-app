"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '../lib';

export function useRequireAuth() {
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const session = await getSession();
      if (!session) {
        // If user is not authenticated, redirect to the homepage
        router.push('/');
      }
    }

    checkAuth();
  }, []);

  // Returning an empty array as a placeholder for dependencies
  return [];
}
