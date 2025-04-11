import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const AssignReview = () => {
  const [reviewerId, setReviewerId] = useState("");
  const [reviewedId, setReviewedId] = useState("");
  const [toast, setToast] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const employees = useSelector((store) => store.employees) || [];

  const navigate = useNavigate();

  const handleFetchAssignReview = async () => {
    setError("");

    if (!reviewerId || !reviewedId) {
      setError("Both reviewer and reviewed fields are required.");
      return;
    }

    if (reviewerId === reviewedId) {
      setError("Reviewer and reviewed cannot be the same person.");
      return;
    }

    try {
      const res = await axios.post(
        BASE_URL + "/review/" + reviewerId + "/" + reviewedId,
        {},
        { withCredentials: true }
      );

      console.log(res);

      if (res.status === 200) {
        setToast(true);
        setSuccess(res?.data?.message);
        setTimeout(() => {
          setToast(false);
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-2/6 m-auto bg-gray-950 p-5 flex flex-col justify-center rounded-box mt-10">
        {toast && (
          <div className="toast toast-top toast-end z-50 transition-all duration-300 ease-in-out">
            <div className="alert alert-success shadow-lg">
              <span>{success}</span>
            </div>
          </div>
        )}
        <fieldset className="fieldset w-full p-4 rounded-box">
          <legend className="fieldset-legend text-center text-3xl font-light">
            Assign Review
          </legend>
          <div className="grid grid-cols-1">
            <label className="fieldset-label">Reviewer Name</label>
            <select
              className="input w-full my-3 focus:outline-none"
              value={reviewerId}
              onChange={(e) => setReviewerId(e.target.value)}
            >
              <option value="">Reviewer Name</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.name}
                </option>
              ))}
            </select>

            <label className="fieldset-label">Reviewed Name</label>
            <select
              className="input w-full my-3 focus:outline-none"
              value={reviewedId}
              onChange={(e) => setReviewedId(e.target.value)}
            >
              <option value="">Reviewed Name</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p className="text-red-500 font-semibold text-[13px]">{error}</p>
          )}

          <button
            className="btn bg-green-600 mt-4 py-3"
            onClick={() => handleFetchAssignReview()}
          >
            Assign
          </button>
        </fieldset>
      </div>
    </>
  );
};

export default AssignReview;
