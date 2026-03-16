import { createSlice } from "@reduxjs/toolkit";

interface EmployeeState {
  loading: boolean;
  employees: any[];
  error: string | null;
}

const initialState: EmployeeState = {
  loading: false,
  employees: [],
  error: null
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {

    addEmployeeRequest: (state) => {
      state.loading = true;
    },

    addEmployeeSuccess: (state) => {
      state.loading = false;
    },

    addEmployeeFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getEmployeesRequest: (state) => {
      state.loading = true;
    },

    getEmployeesSuccess: (state, action) => {
      state.loading = false;
      state.employees = action.payload;
    },

    getEmployeesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }

  }
});

export const {
  addEmployeeRequest,
  addEmployeeSuccess,
  addEmployeeFailure,
  getEmployeesRequest,
  getEmployeesSuccess,
  getEmployeesFailure
} = employeeSlice.actions;

export default employeeSlice.reducer;