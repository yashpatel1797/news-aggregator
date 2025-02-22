import { PayloadAction } from '@reduxjs/toolkit';

export const createResetReducer = <T>(initialState: T) => ({
  reset: () => initialState
});

export const createUpdateReducer = <T>() => ({
  update: (state: T, action: PayloadAction<Partial<T>>) => ({
    ...state,
    ...action.payload
  })
});