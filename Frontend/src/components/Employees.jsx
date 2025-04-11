import React, { useEffect } from "react";
import ReceivedFeedbacks from "./ReceivedFeedbacks";
import AssignedReviews from "./AssignedReviews";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addAssignedReviews } from "../utils/assignedReview";
import { addReviews } from "../utils/reviewSlice";

const Employees = () => {
  const assignedReviews = useSelector((store) => store.assignedReview);
  const receivedFeedbacks = useSelector((store) => store.reviews);

  const dispatch = useDispatch();

  const fetchReceivedFeedbacks = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feedbacks/received", {
        withCredentials: true,
      });
      dispatch(addReviews(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAssignedReviwes = async () => {
    try {
      const res = await axios.get(BASE_URL + "/my-feedbacks", {
        withCredentials: true,
      });

      dispatch(addAssignedReviews(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!Array.isArray(receivedFeedbacks) || receivedFeedbacks.length === 0) {
      fetchReceivedFeedbacks();
    }
    if (!Array.isArray(assignedReviews) || assignedReviews.length === 0) {
      fetchAssignedReviwes();
    }
  }, []);

  return (
    <div className="w-5/6 m-auto flex items-center justify-between gap-10">
      <ReceivedFeedbacks />
      <AssignedReviews />
    </div>
  );
};

export default Employees;
