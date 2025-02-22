import { useEffect, useCallback, useRef } from 'react';
import { InfiniteScrollOptions, ScrollState } from './types';

export function useInfiniteScroll(
  onLoadMore: () => void,
  {
    threshold = 100,
    disabled = false
  }: InfiniteScrollOptions = {}
) {
  const scrollRef = useRef<number | undefined>(undefined);

  const getScrollState = useCallback((): ScrollState => ({
    scrollTop: window.scrollY,
    windowHeight: window.innerHeight,
    documentHeight: document.documentElement.scrollHeight
  }), []);

  const shouldLoadMore = useCallback(
    (scrollState: ScrollState) => {
      const { scrollTop, windowHeight, documentHeight } = scrollState;
      return documentHeight - (scrollTop + windowHeight) < threshold;
    },
    [threshold]
  );

  const handleScroll = useCallback(() => {
    if (disabled) return;

    if (scrollRef.current) {
      window.cancelAnimationFrame(scrollRef.current);
    }

    scrollRef.current = window.requestAnimationFrame(() => {
      const scrollState = getScrollState();
      if (shouldLoadMore(scrollState)) {
        onLoadMore();
      }
    });
  }, [disabled, getScrollState, shouldLoadMore, onLoadMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollRef.current) {
        window.cancelAnimationFrame(scrollRef.current);
      }
    };
  }, [handleScroll]);
}