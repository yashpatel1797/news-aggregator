import { Article } from '@/types';

export interface ArticlesState {
  items: Article[];
  loading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
  pageSize: number;
}

export interface FiltersState {
  searchQuery: string;
  dateRange: {
    from: string | null;
    to: string | null;
  };
  selectedCategories: string[];
  selectedSources: string[];
}