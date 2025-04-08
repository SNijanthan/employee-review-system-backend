const jwt = require("jsonwebtoken");
const { User } = require("../model/User.model");

require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const { TOKEN } = req.cookies;

    if (!TOKEN) {
      return res.status(401).json({
        success: false,
        message: "Session expired, Please login again..!",
      });
    }

    const verifyToken = jwt.verify(TOKEN, process.env.JWT_SECRET);

    const user = await User.findById(verifyToken._id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "No User exists..!",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
};

module.exports = { auth };
