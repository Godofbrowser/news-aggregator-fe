export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  publishedAt: string;
  source: string;
  category: string;
  url: string;
}

export interface NewsFilters {
  category?: string;
  source?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: 'latest' | 'relevance';
}

export interface NewsStats {
  totalArticles: number;
  totalCategories: number;
  totalSources: number;
}

export interface ApiNewsStats {
  total_articles: number;
  total_categories: number;
  total_sources: number;
}