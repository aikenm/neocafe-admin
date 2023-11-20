import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './adminSlice';
import menuReducer from './menuSlice';

const store = configureStore({
  reducer: {
    admin: adminReducer,
    menu: menuReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['menu.items.image'],
      },
    }),
});

export default store;