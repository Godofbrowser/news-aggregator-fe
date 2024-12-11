"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { getSources, getCategories } from '@/lib/api/data';
import { AppContextType, Source, Category, ArticlesContextType } from '@/lib/types/app';
import { AuthUser } from '@/lib/types/auth';
import { getAUthUser } from '@/lib/api/auth';
import { SplashScreen } from '@/components/SplashScreen';
import { NewsArticle, NewsFilters as NewsFiltersType } from '@/lib/types/news';
import { searchNews } from '@/lib/api/news';

const ArticlesContext = createContext<ArticlesContextType | undefined>(undefined);

export function ArticlesContextProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [query, setQuery] = useState<string | undefined>();
  const [sortType, setSortType] = useState<'latest' | 'relevance'>('latest');
  const [selectedSource, setSelectedSource] = useState<string>();
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const fetchNews = useCallback(async (filters?: NewsFiltersType) => {
    try {
      setLoading(true);
      const data = await searchNews(query, filters);
      setArticles(data);
    } catch (error) {
      console.error('Failed to fetch news:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews({
      sortBy: sortType,
      category: selectedCategory,
      source: selectedSource,
    })
  }, [sortType, selectedCategory, selectedSource]);

  return (
    <ArticlesContext.Provider
      value={{
        loading,
        query,
        articles,
        selectedSource,
        selectedCategory,
        sortType,
        setSelectedSource,
        setSelectedCategory,
        setQuery,
        setSortType,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
}

export const useArticlesContext = () => {
  const context = useContext(ArticlesContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};