import { createSlice } from "@reduxjs/toolkit";
import { initialItems, initialCategories } from "../common";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    items: JSON.parse(localStorage.getItem("items")) || initialItems,
    categories:
      JSON.parse(localStorage.getItem("categories")) || initialCategories,
  },
  reducers: {
    addItem: (state, action) => {
      const maxId = state.items.reduce(
        (max, item) => Math.max(max, item.id),
        0
      );
      const newItem = { ...action.payload, id: maxId + 1 };
      state.items.push(newItem);
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
