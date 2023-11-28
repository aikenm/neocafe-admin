import { createSlice } from '@reduxjs/toolkit';

export const stockSlice = createSlice({
    name: 'stock',
    initialState: {
        items: [],
    },
    reducers: {
        addStockItem: (state, action) => {
            state.items.push(action.payload);
        },
        editStockItem: (state, action) => {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = { ...state.items[index], ...action.payload };
            }
        },
        deleteStockItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        initializeStockItems: (state, action) => {
            state.items = action.payload;
        },
    },
});

export const { addStockItem, editStockItem, deleteStockItem, initializeStockItems } = stockSlice.actions;
export default stockSlice.reducer;
