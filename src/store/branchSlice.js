import { createSlice } from "@reduxjs/toolkit";
import { initialBranches } from "../common";

export const branchSlice = createSlice({
  name: "branch",
  initialState: {
    branches: JSON.parse(localStorage.getItem("branches")) || initialBranches,
  },
  reducers: {
    addBranch: (state, action) => {
      const maxId = state.branches.reduce(
        (max, branch) => Math.max(max, branch.id),
        0
      );
      const newBranch = { ...action.payload, id: maxId + 1 };
      state.branches.push(newBranch);
      localStorage.setItem("branches", JSON.stringify(state.branches));
    },
    editBranch: (state, action) => {
      const index = state.branches.findIndex(
        (branch) => branch.id === action.payload.id
      );
      if (index !== -1) {
        // Correctly handle the update to ensure all nested data is updated
        state.branches[index] = { ...state.branches[index], ...action.payload };
        localStorage.setItem("branches", JSON.stringify(state.branches));
      }
    },

    deleteBranch: (state, action) => {
      state.branches = state.branches.filter(
        (branch) => branch.id !== action.payload
      );
      localStorage.setItem("branches", JSON.stringify(state.branches));
    },
    initializeBranches: (state, action) => {
      state.branches = action.payload;
      localStorage.setItem("branches", JSON.stringify(state.branches));
    },
  },
});

export const { addBranch, editBranch, deleteBranch, initializeBranches } =
  branchSlice.actions;
export default branchSlice.reducer;
