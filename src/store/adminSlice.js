import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isLoggedIn = true;
      state.error = null;
    },
    loginFailed: (state, action) => {
      state.isLoggedIn = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.error = null;
      localStorage.removeItem('token'); 
    }
  }
});

export const { loginSuccess, loginFailed, logout } = adminSlice.actions;
export default adminSlice.reducer;
