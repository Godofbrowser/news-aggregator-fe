"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getSources, getCategories } from '@/lib/api/data';
import { AppContextType, Source, Category } from '@/lib/types/app';
import { AuthUser } from '@/lib/types/auth';
import { getAUthUser } from '@/lib/api/auth';
import { SplashScreen } from '@/components/SplashScreen';

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [sources, setSources] = useState<Source[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [authVerified, setAuthVerified] = useState<boolean>(false);
  const [contentReady, setContentReady] = useState<boolean>(false);
  const [authUser, setAuthUser] = useState<AuthUser | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sourcesData, categoriesData] = await Promise.all([
          getSources(),
          getCategories(),
        ]);
        setSources(sourcesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to fetch app data:', error);
      }
    };

    const fetchUser = async () => {
      let user: AuthUser | undefined = undefined
      try {
        user = await getAUthUser()
      } catch(e) {}
      setAuthUser(user);
      setAuthVerified(true)
    }
    fetchUser().then(() => fetchData());
  }, []);

  if ((!authUser && !authVerified) || !contentReady) return (<SplashScreen onComplete={() => setContentReady(true)} contentReady={authVerified} />)

  return (
    <AppContext.Provider
      value={{
        sources,
        categories,
        authUser,
        setAuthUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};