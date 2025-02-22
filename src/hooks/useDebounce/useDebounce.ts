import { useState, useEffect } from 'react';
import { DebounceOptions } from './types';

export function useDebounce<T>(
  value: T, 
  { delay, immediate = false }: DebounceOptions
): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    if (immediate) {
      setDebouncedValue(value);
      return;
    }

    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, immediate]);

  return debouncedValue;
}