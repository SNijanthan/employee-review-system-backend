import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { removeEmployees } from "../utils/employeeSlice";
import { removeAssignedReviews } from "../utils/assignedReview";
import { removeReviews } from "../utils/reviewSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
    dispatch(removeUser());
    dispatch(removeEmployees());
    dispatch(removeAssignedReviews());
    dispatch(removeReviews());
    navigate("/login");
  };

  return (
    <>
      <div className="navbar bg-neutral text-neutral-content h-20 flex items-center justify-between">
        <Link
          to={user ? "/" : "/login"}
          className="p-3 hover:py-3 hover:rounded-2xl hover:bg-indigo-600 text-xl font-light"
        >
          Employee Review System
        </Link>
        <div className="flex items-center mr-5 font-mono">
          {user?.name && <p className="mx-2">Welcome {user.name} 😊</p>}
          {user?.role && <p className="mx-5">Role: {user.role}</p>}
          {user && user.role === "admin" && (
            <Link to="/add-employee">
              <button className="btn btn-warning text-gray-800 mx-5">
                Add Employee
              </button>
            </Link>
          )}
          {user && user.role === "admin" && (
            <Link to="/assign-review">
              <button className="btn btn-accent text-gray-800 mr-5">
                Assign Review
              </button>
            </Link>
          )}
          {user && (
            <button className="btn" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
