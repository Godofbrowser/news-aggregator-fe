import { AuthUser } from "./auth";
import { NewsArticle } from "./news";

export interface Source {
    id: string;
    name: string;
  }
  
  export interface Category {
    id: string;
    name: string;
  }
  
  export interface AppContextType {
    sources: Source[];
    categories: Category[];
    authUser?: AuthUser;
    setAuthUser: (user?: AuthUser) => void;
  }
  
  export interface ArticlesContextType {
    articles: NewsArticle[];
    loading: boolean;
    query?: string;
    setQuery: (source: string) => void;
    selectedSource?: string;
    setSelectedSource: (source: string | undefined) => void;
    selectedCategory?: string;
    setSelectedCategory: (category: string | undefined) => void;
    sortType: 'latest' | 'relevance';
    setSortType: (sortType: 'latest' | 'relevance') => void;
  }