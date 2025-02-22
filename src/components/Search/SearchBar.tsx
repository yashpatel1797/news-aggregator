import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateFilters } from '@/store/slices/filterSlice';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useDebounce } from '@/hooks/useDebounce/useDebounce';
import { SearchBarProps } from './types';
import { searchStyles } from './styles';

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search articles...",
  className = "",
  autoFocus = false
}) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, { delay: 500 });

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  useEffect(() => {
    dispatch(updateFilters({ searchQuery: debouncedSearchTerm }));
  }, [debouncedSearchTerm, dispatch]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      clearSearch();
    }
  }, [clearSearch]);

  return (
    <div className={`${searchStyles.container} ${className}`}>
      <div className={searchStyles.inputWrapper(isFocused)}>
        <input
          ref={inputRef}
          type="text"
          className={searchStyles.input}
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          aria-label="Search articles"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-4">
          <MagnifyingGlassIcon className={searchStyles.searchIcon(isFocused)} />
        </div>
        {searchTerm && (
          <button
            onClick={clearSearch}
            className={searchStyles.clearButton}
            aria-label="Clear search"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;