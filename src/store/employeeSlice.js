import { createSlice } from "@reduxjs/toolkit";
import { initialEmployees } from "../common";

export const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employees:
      JSON.parse(localStorage.getItem("employees")) || initialEmployees,
  },
  reducers: {
    addEmployee: (state, action) => {
      const maxId = state.employees.reduce(
        (max, employee) => Math.max(employee.id, max),
        0
      );
      const newEmployee = { ...action.payload, id: maxId + 1 };
      state.employees.push(newEmployee);
      localStorage.setItem("employees", JSON.stringify(state.employees));
    },
    editEmployee: (state, action) => {
      const index = state.employees.findIndex(
        (employee) => employee.id === action.payload.id
      );
      if (index !== -1) {
        state.employees[index] = {
          ...state.employees[index],
          ...action.payload,
        };
        localStorage.setItem("employees", JSON.stringify(state.employees));
      }
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload
      );
      localStorage.setItem("employees", JSON.stringify(state.employees));
    },
    initializeEmployees: (state, action) => {
      state.employees = action.payload;
      localStorage.setItem("employees", JSON.stringify(state.employees));
    },
  },
});

export const {
  addEmployee,
  editEmployee,
  deleteEmployee,
  initializeEmployees,
} = employeeSlice.actions;
export default employeeSlice.reducer;
