const mongoose = require("mongoose");

require("dotenv").config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.URI);
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

module.exports = { connectToDatabase };
