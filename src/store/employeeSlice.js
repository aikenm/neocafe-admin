import { createSlice } from '@reduxjs/toolkit';

export const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employees: [],
    },
    reducers: {
        addEmployee: (state, action) => {
            state.employees.push(action.payload);
        },
        editEmployee: (state, action) => {
            const index = state.employees.findIndex(employee => employee.id === action.payload.id);
            if (index !== -1) {
                state.employees[index] = action.payload;
            }
        },
        deleteEmployee: (state, action) => {
            state.employees = state.employees.filter(employee => employee.id !== action.payload);
        },
        initializeEmployees: (state, action) => {
            state.employees = action.payload;
        },
    },
});

export const { addEmployee, editEmployee, deleteEmployee, initializeEmployees } = employeeSlice.actions;
export default employeeSlice.reducer;
