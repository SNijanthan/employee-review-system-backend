const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { User } = require("../model/User.model");

const userRouter = express.Router();

userRouter.get("/users", auth, async (req, res) => {
  try {
    const { role } = req.user;

    if (role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Only Admin can access users details",
      });
    }

    const users = await User.find({ role: { $ne: "admin" } });

    if (!Array.isArray(users) || users.length === 0) {
      return res
        .status(200)
        .json({ success: true, message: "No Employess available..!" });
    }

    res.status(200).json({
      success: true,
      message: "Data retrieved successfully..!",
      users,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = { userRouter };
