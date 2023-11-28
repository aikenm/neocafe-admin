import { createSlice } from '@reduxjs/toolkit';

export const branchSlice = createSlice({
  name: 'branch',
  initialState: {
    branches: []
  },
  reducers: {
    addBranch: (state, action) => {
      state.branches.push(action.payload);
    },
    editBranch: (state, action) => {
      const index = state.branches.findIndex(branch => branch.id === action.payload.id);
      if (index !== -1) {
        state.branches[index] = action.payload;
      }
    },
    deleteBranch: (state, action) => {
        state.branches = state.branches.filter(branch => branch.id !== action.payload);
      }
  }
});

export const { addBranch, editBranch, deleteBranch } = branchSlice.actions;
export default branchSlice.reducer;
