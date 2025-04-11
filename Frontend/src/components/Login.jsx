import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [email, setEmail] = useState("admin1@gmail.com");
  const [password, setPassword] = useState("Admin@123");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { email, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data?.user));

      navigate("/");
    } catch (error) {
      if (error.response?.data?.success === false) {
        setError(error.response?.data?.message);
      }
      console.log(error);
    }
  };
  return (
    <>
      <div className="w-2/6 m-auto bg-gray-950  p-5 flex  flex-col justify-center rounded-box mt-32">
        <fieldset className="fieldset w-full p-4 rounded-box">
          <legend className="fieldset-legend text-center text-3xl font-light">
            Log In
          </legend>
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
          <button className="btn bg-green-600 mt-4 py-6" onClick={handleLogin}>
            Login
          </button>
        </fieldset>
        <div className="px-5 py-2">
          <p>
            New user ?{" "}
            <Link
              to="/signup"
              className="text-sky-400 hover:underline hover:underline-offset-5"
            >
              Signup
            </Link>{" "}
            here
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
