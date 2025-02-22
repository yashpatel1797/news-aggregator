import { createSlice } from '@reduxjs/toolkit';
import { FiltersState } from '../types';
import { createResetReducer, createUpdateReducer } from './baseSlice';

const initialState: FiltersState = {
  searchQuery: '',
  dateRange: {
    from: null,
    to: null,
  },
  selectedCategories: [],
  selectedSources: [],
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    ...createResetReducer(initialState),
    ...createUpdateReducer<FiltersState>(),
  },
});

export const { reset: clearAllFilters, update: updateFilters} = filtersSlice.actions;
export default filtersSlice.reducer;