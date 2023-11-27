import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './adminSlice';
import menuReducer from './menuSlice';
import stockReducer from './stockSlice';

const store = configureStore({
  reducer: {
    admin: adminReducer,
    menu: menuReducer,
    stock: stockReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['menu.items.image'],
      },
    }),
});

export default store;