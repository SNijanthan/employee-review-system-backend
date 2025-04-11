import { createSlice } from "@reduxjs/toolkit";

const employeesSlice = createSlice({
  name: "employee",
  initialState: [],
  reducers: {
    addEmployees: (state, action) => {
      return action.payload;
    },
    removeEmployees: () => [],
  },
});

export default employeesSlice.reducer;
export const { addEmployees, removeEmployees } = employeesSlice.actions;
