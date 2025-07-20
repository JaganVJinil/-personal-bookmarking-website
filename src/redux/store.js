import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import bookmarkReducer from './bookmarkSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    bookmarks: bookmarkReducer,
  },
});

export default store;
