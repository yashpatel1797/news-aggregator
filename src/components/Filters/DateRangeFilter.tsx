import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { updateFilters } from '@/store/slices/filterSlice';
import { FilterCard } from './FilterCard';
import { getDateConstraints } from './dateUtil';
import { DateChangeParams } from './types';

const DateRangeFilter: React.FC = () => {
  const dispatch = useDispatch();
  const { dateRange } = useSelector((state: RootState) => state.filters);
  const { maxDate, minDate } = getDateConstraints();

  const handleDateChange = ({ type, value }: DateChangeParams) => {
    const newDate = value || null;
    
    if (type === 'from' && dateRange.to && newDate && newDate > dateRange.to) {
      dispatch(updateFilters({ dateRange: { from: newDate, to: newDate } }));
      return;
    }

    if (type === 'to' && dateRange.from && newDate && newDate < dateRange.from) {
      dispatch(updateFilters({ dateRange: { from: newDate, to: newDate } }));
      return;
    }

    dispatch(updateFilters({ dateRange: { ...dateRange, [type]: newDate } }));
  };

  return (
    <FilterCard title="Date Range">
      <div className="space-y-3">
        {['from', 'to'].map((type) => (
          <div key={type}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
            <input
              type="date"
              value={dateRange[type as keyof typeof dateRange] || ''}
              min={type === 'to' ? dateRange.from || minDate : minDate}
              max={maxDate}
              onChange={(e) => handleDateChange({ type: type as 'from' | 'to', value: e.target.value })}
              className="w-full p-2 border-2 border-gray-200 rounded-lg 
                      focus:border-blue-500 focus:outline-none transition-colors 
                      duration-200"
            />
          </div>
        ))}
      </div>
    </FilterCard>
  );
};

export default DateRangeFilter;