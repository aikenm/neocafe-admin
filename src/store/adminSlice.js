import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.error = null;
      localStorage.setItem('token', action.payload); 
    },
    loginFailed: (state, action) => {
      state.isLoggedIn = false;
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, loginFailed } = adminSlice.actions;
export default adminSlice.reducer;
