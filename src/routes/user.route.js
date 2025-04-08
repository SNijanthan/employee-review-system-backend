const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { User } = require("../model/User.model");

const userRouter = express.Router();

// Get all users

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

// Get a single user

userRouter.get("/users/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;

    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "User does not exist..!" });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      data: existingUser,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// update user from employee to admin

userRouter.patch("/users/:id/promote", auth, async (req, res) => {
  try {
    const { role } = req.user;

    if (role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Only Admin can promote users",
      });
    }

    const id = req.params.id;

    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist..!" });
    }

    if (existingUser.role === "admin") {
      return res.status(200).json({
        success: true,
        message: `${existingUser.name} is already an Admin.`,
      });
    }

    const updateUser = await User.findByIdAndUpdate(
      id,
      { role: "admin" },
      { runValidators: true, new: true }
    );

    await updateUser.save();

    res.status(200).json({
      success: true,
      message: `${existingUser.name} promoted to Admin`,
      data: updateUser,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete user

userRouter.delete("/users/:id", auth, async (req, res) => {
  try {
    const { role } = req.user;

    if (role !== "admin") {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Only Admin have access to delete user",
      });
    }

    const id = req.params.id;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found..!" });
    }

    res.status(200).json({
      success: true,
      message: `User ${deletedUser.email} deleted successfully.`,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = { userRouter };
