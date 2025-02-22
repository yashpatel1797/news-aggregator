import { STORAGE_KEYS } from './constants';
import { StorageOptions } from './types';
import { UserPreferences } from '@/types';

const DEFAULT_PREFERENCES: UserPreferences = {
  sources: [],
  categories: [],
  authors: []
};
class LocalStorageService {
  static getValue<T>(options: StorageOptions<T>): T {
    try {
      const serializedValue = localStorage.getItem(options.key);
      if (serializedValue === null) {
        return options.defaultValue as T;
      }
      return JSON.parse(serializedValue);
    } catch (error) {
      console.error(`Error loading from localStorage:`, error);
      return options.defaultValue as T;
    }
  }

  static setValue<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error saving to localStorage:`, error);
    }
  }
}

export const loadState = (): UserPreferences => {
  return LocalStorageService.getValue<UserPreferences>({
    key: STORAGE_KEYS.PREFERENCES,
    defaultValue: DEFAULT_PREFERENCES
  });
};

export const saveState = (state: UserPreferences): void => {
  LocalStorageService.setValue(STORAGE_KEYS.PREFERENCES, state);
};