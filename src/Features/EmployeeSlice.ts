import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Employee } from "../Types/Employee";
import { employees as dummyData } from "../Data/mockEmployees";

interface EmployeeState {
  list: Employee[];
}

const initialState: EmployeeState = {
  list: [...dummyData],
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.list.push(action.payload);
    },
    deleteEmployee: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(emp => emp.id !== action.payload);
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.list.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
  },
});

export const { addEmployee, deleteEmployee, updateEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
