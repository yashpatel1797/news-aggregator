import { configureStore, Reducer } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import articlesReducer from './slices/articlesSlice';
import preferencesReducer from './slices/preferencesSlice';
import filtersReducer from './slices/filterSlice';
import { loadState, saveState } from '@/utils/localStorage';
import { UserPreferences } from '@/types';

export const createStore = (preloadedState = {}) => {
  const store = configureStore({
    reducer: {
      articles: articlesReducer,
      preferences: preferencesReducer as Reducer<UserPreferences>,
      filters: filtersReducer,
    },
    preloadedState: {
      preferences: loadState(),
      ...preloadedState
    }
  });

  store.subscribe(() => {
    saveState(store.getState().preferences);
  });

  return store;
};

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;