import { createSlice } from "@reduxjs/toolkit";

const assignedReviewSlice = createSlice({
  name: "assignedReviews",
  initialState: [],
  reducers: {
    addAssignedReviews: (state, action) => {
      return action.payload;
    },
    updateAssignedReviews: (state, action) => {
      return state.push(action.payload);
    },
    removeAssignedReviews: () => {
      return [];
    },
  },
});

export default assignedReviewSlice.reducer;
export const {
  addAssignedReviews,
  updateAssignedReviews,
  removeAssignedReviews,
} = assignedReviewSlice.actions;
