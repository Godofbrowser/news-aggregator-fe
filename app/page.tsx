"use client";

import { useState, useEffect, createElement, ReactElement } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SplashScreen } from '@/components/SplashScreen';
import { getNewsStats } from '@/lib/api/news';
import { NewsStats } from '@/lib/types/news';
import { Newspaper, BookOpen, Building2 } from 'lucide-react';

interface StatCardProp {
  icon: ReactElement;
  label: string;
  count: number;
}

const StatCard = ({icon, label, count}: StatCardProp) => (
  <div className="p-6 bg-card rounded-lg shadow-lg">
    {createElement(icon as any, {className: 'w-12 h-12 mx-auto mb-4 text-primary' })}
    <h2 className="text-3xl font-bold mb-2">{count}</h2>
    <p className="text-muted-foreground">{label}</p>
  </div>
)

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const [stats, setStats] = useState<NewsStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getNewsStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
      setContentReady(true);
    };
    fetchStats();
  }, []);

  

  return (
    <>
      {/* {showSplash && (<SplashScreen onComplete={() => setShowSplash(false)} contentReady={contentReady} />)} */}
      <main className="min-h-screen bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to NewsHub
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Your personalized news platform with curated content from trusted sources
          </p>

          <div className="flex gap-4 justify-center mb-12">
            <Link href="/login">
              <Button size="lg">Login</Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline">Register</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats && (
              <>
                <StatCard icon={Newspaper as any} label="Articles Available" count={stats.totalArticles} />
                <StatCard icon={BookOpen as any} label="Categories" count={stats.totalCategories} />
                <StatCard icon={Building2 as any} label="News Sources" count={stats.totalSources} />
              </>
            )}
          </div>
        </div>
      </main>
    </>

  );
}