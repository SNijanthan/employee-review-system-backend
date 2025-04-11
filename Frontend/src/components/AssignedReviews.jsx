import axios from "axios";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";

const AssignedReviews = () => {
  const reviewsFromStore = useSelector((store) => store.assignedReview) || [];

  const [assignedReviews, setAssignedReviews] = useState([]);
  const [comments, setComments] = useState({});

  useEffect(() => {
    setAssignedReviews(reviewsFromStore);
  }, [reviewsFromStore]);

  const handleChange = (id, value) => {
    setComments((prev) => ({ ...prev, [id]: value }));
  };

  const handleUpdateComment = async (reviewedId) => {
    try {
      const commentText = comments[reviewedId];

      if (!commentText || commentText.trim().length === 0) {
        alert("Comment cannot be empty");
        return;
      }

      const res = await axios.patch(
        `${BASE_URL}/feedback/${reviewedId}`,
        { comments: commentText },
        { withCredentials: true }
      );

      if (res.data.success) {
        setAssignedReviews((prev) =>
          prev.filter((review) => review.reviewedId._id !== reviewedId)
        );
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="w-full text-center flex flex-col items-center">
      <h1 className="my-5 text-6xl font-light tracking-wider">
        Assigned Reviews
      </h1>
      {assignedReviews.map((review) => (
        <div className="card bg-base-300 w-96 my-1" key={review._id}>
          <div className="card-body text-center">
            <p className="text-xl font-light">
              {review.reviewedId.name.toUpperCase()}
            </p>
            <textarea
              className="textarea"
              placeholder="Comments"
              value={comments[review.reviewedId._id] || ""}
              onChange={(e) =>
                handleChange(review.reviewedId._id, e.target.value)
              }
            ></textarea>
            <div className="card-actions justify-end mt-5">
              <button
                className="btn bg-gray-500 text-black font-light mx-auto"
                onClick={() => handleUpdateComment(review.reviewedId._id)}
              >
                Update Comments
              </button>
            </div>
          </div>
        </div>
      ))}
      {assignedReviews.length === 0 && (
        <p className="text-xl mt-5 text-gray-500">No more assigned reviews.</p>
      )}
    </div>
  );
};

export default AssignedReviews;
