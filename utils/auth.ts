"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '../lib';
import { useUser } from '@/hooks/useUser';

export function useRequireAuth() {
  const router = useRouter();
  const userData = useUser();

  useEffect(() => {
    async function checkAuth() {
      const session = await getSession();
      if (!session) {
        // If user is not authenticated, redirect to the homepage
        userData.setLoggedIn(false);
        router.push('/');
      }
    }

    checkAuth();
  }, []);

  // Returning an empty array as a placeholder for dependencies
  return [];
}
