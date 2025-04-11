import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    setSuccess("");
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { name, email, password },
        { withCredentials: true }
      );
      console.log(res);
      if (res.status === 200) {
        setSuccess(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      if (error.response.data.success === false) {
        setError(error.response?.data?.message);
      }
    }
  };
  return (
    <>
      <div className="w-2/6 m-auto bg-gray-950  p-5 flex  flex-col justify-center rounded-box mt-20">
        <fieldset className="fieldset w-full p-4 rounded-box">
          <legend className="fieldset-legend text-center text-3xl font-light">
            Sign Up
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
              {success}.Redirecting to login page..!
            </p>
          )}
          <button className="btn bg-green-600 mt-4 py-6" onClick={handleSignup}>
            Sign up
          </button>
        </fieldset>
      </div>
    </>
  );
};

export default Signup;
