import { createSlice } from '@reduxjs/toolkit';
import { UserPreferences } from '@/types';
import { createResetReducer, createUpdateReducer } from './baseSlice';

const initialState: UserPreferences = {
  sources: [],
  categories: [],
  authors: [],
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: initialState as UserPreferences,
  reducers: {
    ...createResetReducer(initialState),
    ...createUpdateReducer<UserPreferences>(),
  },
});

export const { reset: clearAllPreferences, update: updatePreferences } = preferencesSlice.actions;
export default preferencesSlice.reducer;
