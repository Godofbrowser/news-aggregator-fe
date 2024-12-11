import { ApiNewsStats, NewsArticle, NewsFilters, NewsStats } from '@/lib/types/news';
import { apiClient } from '.';


export const getNewsStats = async (): Promise<NewsStats> => {
  const {data} = await apiClient.get<ApiNewsStats>(`news/stats`);
  return {
    totalArticles: data.total_articles,
    totalCategories: data.total_categories,
    totalSources: data.total_sources,
  }
};

export const getNewsFeed = async (filters?: NewsFilters): Promise<NewsArticle[]> => {
  const response = await apiClient.get(`news/feed`, {
    params: filters
  });
  return response.data;
};

export const searchNews = async (query?: string, filters?: NewsFilters): Promise<NewsArticle[]> => {
  const response = await apiClient.get(`news`, {
    params: { query, ...filters }
  });
  return response.data;
};