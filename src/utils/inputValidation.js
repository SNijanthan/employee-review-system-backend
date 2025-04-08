const validator = require("validator");

const validateSignUpData = (req) => {
  const { name, email, password, role } = req.body;

  if (!name?.trim()) {
    throw new Error("Name field cannot be empty");
  }

  if (!email?.trim()) {
    throw new Error("Email field cannot be empty");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }

  if (!password?.trim()) {
    throw new Error("Password field cannot be empty");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password");
  }

  if (role && role !== "admin" && role !== "employee") {
    throw new Error(`Invalid role: ${role}`);
  }
};

module.exports = { validateSignUpData };
