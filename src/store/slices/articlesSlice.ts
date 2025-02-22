import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { ArticlesState } from '../types';
import { fetchArticles } from '@/services/api/index';

const initialState: ArticlesState = {
  items: [],
  loading: false,
  error: null,
  page: 1,
  hasMore: true,
  pageSize: 10,
};

export const fetchArticlesThunk = createAsyncThunk(
    'articles/fetchArticles',
    async ({ isLoadMore = false }: { isLoadMore?: boolean } = {}, 
      { getState, rejectWithValue }
    ) => {
      try {
        const state = getState() as RootState;
        const { filters, preferences, articles} = state;

        const currentPage = isLoadMore ? articles.page : 1;
      const params = {
        query: filters.searchQuery,
        categories: filters.selectedCategories.length > 0
          ? filters.selectedCategories
          : preferences.categories,
          sources: filters.selectedSources.length > 0
          ? filters.selectedSources
          : preferences.sources,
        dateFrom: filters.dateRange.from,
        dateTo: filters.dateRange.to,
        page: currentPage,
        pageSize: articles.pageSize
      };
      const { articles: newArticles, hasMore } = await fetchArticles(params);

      return {
        articles: newArticles,
        isLoadMore,
        hasMore
      };
    } catch (error: unknown) {
        if (error instanceof Error) {
            return rejectWithValue(error.message);
          }
          return rejectWithValue('An unknown error occurred');
    }
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    clearArticles: (state) => {
        state.items = [];
        state.error = null;
        state.page = 1;
        state.hasMore = true;
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticlesThunk.fulfilled, (state, action) => {
        const { articles, isLoadMore, hasMore } = action.payload;
        state.items = isLoadMore ? [...state.items, ...articles] : articles;
        state.page = isLoadMore ? state.page + 1 : 2;
        state.loading = false;
        state.hasMore = hasMore;
      })
      .addCase(fetchArticlesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.hasMore = false;
      });
  },
});

export const { clearArticles } = articlesSlice.actions;
export default articlesSlice.reducer;