"use client"

import { useAppContext } from '@/contexts/AppContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function ensureAuth(requiresAuth: boolean, Component: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const { authUser } = useAppContext();
    const router = useRouter();
    const [canView, setCanView] = useState(false)

    useEffect(() => {
      console.log('#'.repeat(45), ' ', authUser && !requiresAuth)
      if (requiresAuth && authUser) {
        setCanView(true);
        return;
      }
      if (!requiresAuth && !authUser) {
        setCanView(true);
        return;
      }

      if (!authUser && requiresAuth) {
        router.push('/login');
      } else if (authUser && !requiresAuth) {
        router.push('/dashboard');
      }
    }, [authUser]);



    return canView ? <Component {...props} /> : null;
  };
}