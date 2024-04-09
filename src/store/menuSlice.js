import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    items: JSON.parse(localStorage.getItem("items")) || [],
    categories: JSON.parse(localStorage.getItem("categories")) || [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("items", JSON.stringify(state.items));
    },
    editItem: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
        localStorage.setItem("items", JSON.stringify(state.items));
      }
    },
    deleteItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("items", JSON.stringify(state.items));
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
      localStorage.setItem("categories", JSON.stringify(state.categories));
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
      localStorage.setItem("categories", JSON.stringify(state.categories));
    },
    initializeCategoriesInBulk: (state, action) => {
      state.categories = action.payload;
    },
    initializeItems: (state, action) => {
      state.items = action.payload;
      localStorage.setItem("items", JSON.stringify(state.items));
    },
  },
});

export const {
  addItem,
  editItem,
  deleteItem,
  addCategory,
  deleteCategory,
  initializeCategoriesInBulk,
  initializeItems,
} = menuSlice.actions;
export default menuSlice.reducer;
