import React from "react";
import { useSelector } from "react-redux";

const ReceivedFeedbacks = () => {
  const reviews = useSelector((store) => store.reviews);
  return (
    <>
      <div className="w-full text-center flex flex-col items-center">
        <h1 className="my-5 text-6xl font-light tracking-wider">
          ReceivedFeedbacks
        </h1>
        {reviews.map((review) => (
          <div className="card bg-base-300 w-96">
            <div className="card-body text-center ">
              <p className="text-2xl font-light mb-2">
                {review.reviewerId.name.toUpperCase()}
              </p>
              <p className="tracking-wide">{review.comments}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ReceivedFeedbacks;
