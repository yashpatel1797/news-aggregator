import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { updateFilters, clearAllFilters } from '@/store/slices/filterSlice';
import { NEWS_CATEGORIES, NEWS_SOURCES } from '@/constants';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { CustomCheckbox } from './CustomCheckbox';
import { FilterCard } from './FilterCard';
import ClearButton from '../shared/ClearButton';
import DateRangeFilter from './DateRangeFilter';

const FilterSection: React.FC = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  const preferences = useSelector((state: RootState) => state.preferences);

  const hasActiveFilters = filters.selectedCategories.length > 0 || 
                          filters.selectedSources.length > 0 ||
                          filters.dateRange.from ||
                          filters.dateRange.to;
  const hasPreferences = preferences.categories.length > 0;

  const handleChange = (type: 'categories' | 'sources', id: string) => {
    const currentSelection = type === 'categories' ? filters.selectedCategories : filters.selectedSources;
    const updatedSelection = currentSelection.includes(id)
      ? currentSelection.filter(item => item !== id)
      : [...currentSelection, id];
    
    dispatch(updateFilters({ 
      [type === 'categories' ? 'selectedCategories' : 'selectedSources']: updatedSelection 
    }));
  };

  return (
    <div className="space-y-6">
      <FilterCard title="Filter By Category">
        {hasActiveFilters && (
          <ClearButton
            onClick={() => dispatch(clearAllFilters())}
            label="Clear All Filters"
          />
        )}

        {hasActiveFilters && hasPreferences && (
          <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
            <div className="flex items-center text-yellow-800 text-sm">
              <ExclamationCircleIcon className="h-5 w-5 mr-2 text-yellow-500" />
              <span>Active filters override your preferences</span>
            </div>
          </div>
        )}

        <div className="space-y-1">
          {NEWS_CATEGORIES.map(category => (
            <CustomCheckbox
              key={category.id}
              checked={filters.selectedCategories.includes(category.id)}
              onChange={() => handleChange('categories', category.id)}
              label={category.name}
            />
          ))}
        </div>
      </FilterCard>

      <FilterCard title="Filter By Source">
        <div className="space-y-1">
          {NEWS_SOURCES.map(source => (
            <CustomCheckbox
              key={source.id}
              checked={filters.selectedSources.includes(source.id)}
              onChange={() => handleChange('sources', source.id)}
              label={source.name}
            />
          ))}
        </div>
      </FilterCard>

      <DateRangeFilter />
    </div>
  );
};

export default FilterSection;
