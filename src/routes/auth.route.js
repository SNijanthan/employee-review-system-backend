const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { validateSignUpData } = require("../utils/inputValidation");
const { User } = require("../model/User.model");
const { auth } = require("../middleware/auth.middleware");

require("dotenv").config();

const authRouter = express.Router();

// New user signup

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    const { name, email, password, role } = req.body;

    // Checking user already exists in DB

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User already exists..!" });
    }

    // Password Hashing

    const hashPassword = await bcrypt.hash(password, 10);

    // User added into DB

    const user = new User({ name, email, password: hashPassword, role });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Signup completed successfully..!",
      user,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// User login

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not exists..." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect credentials. Please try again.",
      });
    }

    if (isPasswordValid) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res
        .cookie("TOKEN", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        })
        .status(200)
        .json({
          success: true,
          message: "Logegedin successfully..!",
          user,
        });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// User logout

authRouter.post("/logout", auth, async (req, res) => {
  try {
    res
      .cookie("TOKEN", null, { expires: new Date(0), httpOnly: true })
      .status(200)
      .json({ success: true, message: "Logged out succesfully..!" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = { authRouter };
