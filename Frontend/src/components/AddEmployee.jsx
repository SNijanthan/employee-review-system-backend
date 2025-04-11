import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addEmployees } from "../utils/employeeSlice";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchAddEmployess = async () => {
    setError("");
    setSuccess("");
    try {
      const res = await axios.post(
        BASE_URL + "/users",
        { name, email, password },
        { withCredentials: true }
      );
      if (res.status === 201) {
        dispatch(addEmployees(res.data?.data));
        setSuccess(res.data?.message);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      if (error.response?.data?.success === false) {
        setError(error.response?.data?.message);
      }
      console.log(error);
    }
  };

  return (
    <>
      {" "}
      <div className="w-2/6 m-auto bg-gray-950  p-5 flex  flex-col justify-center rounded-box mt-20">
        <fieldset className="fieldset w-full p-4 rounded-box">
          <legend className="fieldset-legend text-center text-3xl font-light">
            Add Employee
          </legend>
          <label className="fieldset-label">Name</label>
          <input
            type="text"
            className="input w-full my-3 py-6 focus:outline-none"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="fieldset-label">Email</label>
          <input
            type="email"
            className="input w-full my-3 py-6 focus:outline-none"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="fieldset-label">Password</label>
          <input
            type="text"
            className="input w-full my-3 py-6 focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && (
            <p className="text-red-500 font-semibold text-[13px]">{error}</p>
          )}
          {success && (
            <p className="text-green-500 font-semibold text-[13px]">
              {success}.Redirecting to home page..!
            </p>
          )}
          <button
            className="btn bg-green-600 mt-4 py-6"
            onClick={fetchAddEmployess}
          >
            Add User
          </button>
        </fieldset>
      </div>
    </>
  );
};

export default AddEmployee;
