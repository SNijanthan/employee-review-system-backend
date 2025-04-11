import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import employeesReducer from "./employeeSlice";
import assignedReviewsReducer from "./assignedReview";
import reviewReducer from "./reviewSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    employees: employeesReducer,
    assignedReview: assignedReviewsReducer,
    reviews: reviewReducer,
  },
});

export default appStore;
