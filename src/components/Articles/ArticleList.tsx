import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { clearArticles, fetchArticlesThunk } from '@/store/slices/articlesSlice';
import ArticleGrid from './ArticleGrid';
import ArticleSkeleton from './ArticleSkeleton';
import ErrorMessage from '../shared/ErrorMessage';

const SKELETON_COUNT = 6;
const SCROLL_THRESHOLD = 0.8;

const ArticleList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error, hasMore } = useAppSelector(state => state.articles);
  const filters = useAppSelector(state => state.filters);
  const preferences = useAppSelector(state => state.preferences);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadingRef = useRef(false);
  const requestRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const searchParams = JSON.stringify({ filters, preferences });

  useEffect(() => {
    if (requestRef.current) {
      clearTimeout(requestRef.current);
    }

    requestRef.current = setTimeout(() => {
      dispatch(clearArticles());
      dispatch(fetchArticlesThunk({ isLoadMore: false }));
    }, 500);

    return () => {
      if (requestRef.current) {
        clearTimeout(requestRef.current);
      }
    };
  }, [searchParams, dispatch]);

  const handleScroll = useCallback(() => {
    if (loadingRef.current || !hasMore || loading) return;

    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercentage = scrollPosition / documentHeight;

    if (scrollPercentage > SCROLL_THRESHOLD) {
      loadingRef.current = true;
      setIsLoadingMore(true);
      dispatch(fetchArticlesThunk({ isLoadMore: true }))
        .finally(() => {
          loadingRef.current = false;
          setIsLoadingMore(false);
        });
    }
  }, [dispatch, hasMore, loading]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (error) {
    return (
      <ErrorMessage 
        message={error}
        onRetry={() =>{ dispatch(clearArticles());
          dispatch(fetchArticlesThunk({ isLoadMore: false }));}}
      />
    );
  }

  if (loading && items.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(SKELETON_COUNT)].map((_, index) => (
          <ArticleSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!loading && items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No articles found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ArticleGrid articles={items} />
      
      {isLoadingMore && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
        </div>
      )}

      {!hasMore && items.length > 0 && !isLoadingMore && (
        <div className="text-center py-4 text-gray-600">
          No more articles to load
        </div>
      )}
    </div>
  );
};

export default ArticleList;