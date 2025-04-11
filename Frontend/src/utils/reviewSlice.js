import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "reviews",
  initialState: [],
  reducers: {
    addReviews: (state, action) => {
      return action.payload;
    },
    removeReviews: () => {
      return [];
    },
  },
});

export default reviewSlice.reducer;
export const { addReviews, removeReviews } = reviewSlice.actions;
