import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { clearAllPreferences, updatePreferences } from '@/store/slices/preferencesSlice';
import { NEWS_CATEGORIES, NEWS_SOURCES } from '@/constants';
import { StarIcon } from '@heroicons/react/24/outline';
import { CustomCheckbox } from './CustomCheckbox';
import { FilterCard } from './FilterCard';
import ClearButton from '../shared/ClearButton';

const PreferencesSection: React.FC = () => {
  const dispatch = useDispatch();
  const preferences = useSelector((state: RootState) => state.preferences);

  const hasActivePreferences = preferences.sources.length > 0 || preferences.categories.length > 0;

  const handleChange = (type: 'categories' | 'sources', id: string) => {
    const currentSelection = type === 'categories' ? preferences.categories : preferences.sources;
    const updatedSelection = currentSelection.includes(id)
      ? currentSelection.filter(item => item !== id)
      : [...currentSelection, id];
    
    dispatch(updatePreferences({ 
      [type === 'categories' ? 'categories' : 'sources']: updatedSelection 
    }));
  };

  return (
    <div className="mt-6">
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <StarIcon className="h-5 w-5 text-blue-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">
              Personalize Your Feed
            </h2>
          </div>
        </div>
        
        {hasActivePreferences && (
          <ClearButton 
            onClick={() => dispatch(clearAllPreferences())}
            label="Clear All Preferences"
          />
        )}

        <p className="text-sm text-blue-700 mb-4 opacity-75">
          Select your preferred sources and categories to customize your news feed.
        </p>
      </div>
      
      <div className="space-y-6 mt-4">
        <FilterCard 
          title="Preferred Sources"
          icon={<span className="text-blue-500">●</span>}
        >
          <div className="space-y-1">
            {NEWS_SOURCES.map(source => (
              <CustomCheckbox
                key={source.id}
                checked={preferences.sources.includes(source.id)}
                onChange={() => handleChange('sources', source.id)}
                label={source.name}
              />
            ))}
          </div>
        </FilterCard>

        <FilterCard 
          title="Preferred Categories"
          icon={<span className="text-blue-500">●</span>}
        >
          <div className="space-y-1">
            {NEWS_CATEGORIES.map(category => (
              <CustomCheckbox
                key={category.id}
                checked={preferences.categories.includes(category.id)}
                onChange={() => handleChange('categories', category.id)}
                label={category.name}
              />
            ))}
          </div>
        </FilterCard>
      </div>
    </div>
  );
};

export default PreferencesSection;