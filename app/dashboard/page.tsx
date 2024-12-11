"use client";

import { useCallback, useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { NewsGrid } from '@/components/news/NewsGrid';
import { NewsFilters } from '@/components/news/NewsFilters';
import { searchNews } from '@/lib/api/news';
import { NewsArticle, NewsFilters as NewsFiltersType } from '@/lib/types/news';
import { ensureAuth } from '@/containers/ensureAuth';
import { useArticlesContext } from '@/contexts/ArticlesContext';

export default ensureAuth(true, function DashboardPage() {
  const {articles, loading} = useArticlesContext()
  const [query] = useState(''); // todo: full text search

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold"><span className='max-sm:hidden'>Your News </span>Feed</h1>
          <NewsFilters />
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-72 bg-muted rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : (
          <NewsGrid articles={articles} />
        )}
      </main>
    </div>
  );
})