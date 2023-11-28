import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './adminSlice';
import menuReducer from './menuSlice';
import stockReducer from './stockSlice';
import branchSlice from './branchSlice';

const store = configureStore({
  reducer: {
    admin: adminReducer,
    menu: menuReducer,
    stock: stockReducer,
    branch: branchSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['menu.items.image'],
      },
    }),
});

export default store;