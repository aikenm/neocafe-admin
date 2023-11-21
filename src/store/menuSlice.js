import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    items: [],
    categories: [],
  },
  reducers: {

    // Item

    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    editItem: (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
            state.items[index] = { ...state.items[index], ...action.payload };
        }
    },          

    deleteItem: (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
    },

    // Category

    addCategory: (state, action) => {
        state.categories.push(action.payload);
    },
  
    deleteCategory: (state, action) => {
        state.categories = state.categories.filter(category => category.id !== action.payload);
    },
  },
});

export const { addItem, editItem, deleteItem, addCategory, deleteCategory } = menuSlice.actions;
export default menuSlice.reducer;
