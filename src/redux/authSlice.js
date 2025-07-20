// src/redux/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialUser = JSON.parse(localStorage.getItem('currentUser')) || null;

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialUser,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('currentUser');
    },
    signup(state, action) {
      const users = JSON.parse(localStorage.getItem('users')) || [];
      users.push(action.payload);
      localStorage.setItem('users', JSON.stringify(users));
    },
  },
});

export const { login, logout, signup } = authSlice.actions;
export default authSlice.reducer;
