import { createSlice } from '@reduxjs/toolkit';

export const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    items: [],
  },
  reducers: {
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
        console.log('Deleting item with id:', action.payload);
        state.items = state.items.filter(item => item.id !== action.payload);
        console.log('Remaining items:', state.items);
    },
    
  },
});

export const { addItem, editItem, deleteItem } = menuSlice.actions;
export default menuSlice.reducer;
