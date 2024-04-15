import { createSlice } from "@reduxjs/toolkit";
import { initialStockItems, initialBranches } from "../common";

export const stockSlice = createSlice({
  name: "stock",
  initialState: {
    items: JSON.parse(localStorage.getItem("stockItems")) || initialStockItems,
    branches: initialBranches,
  },
  reducers: {
    addStockItem: (state, action) => {
      const maxId = state.items.reduce(
        (max, item) => Math.max(max, item.id),
        0
      );
      const newItem = { ...action.payload, id: maxId + 1 };
      state.items.push(newItem);
      localStorage.setItem("stockItems", JSON.stringify(state.items));
    },
    editStockItem: (state, action) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
        localStorage.setItem("stockItems", JSON.stringify(state.items));
      }
    },
    deleteStockItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem("stockItems", JSON.stringify(state.items));
    },
    initializeStockItems: (state, action) => {
      state.items = action.payload;
      localStorage.setItem("stockItems", JSON.stringify(state.items));
    },
  },
});

export const {
  addStockItem,
  editStockItem,
  deleteStockItem,
  initializeStockItems,
} = stockSlice.actions;
export default stockSlice.reducer;
