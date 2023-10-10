//redux-toolkit
import { configureStore } from '@reduxjs/toolkit';

import filter from './slices/filterSlice';

//хранилище редьюсеров
export const store = configureStore({
  reducer: {
    filter
  },
});
