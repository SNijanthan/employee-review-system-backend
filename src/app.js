const express = require("express");
const cookie_parser = require("cookie-parser");
const cors = require("cors");

const { connectToDatabase } = require("./config/database");
const { authRouter } = require("./routes/auth.route");
const { userRouter } = require("./routes/user.route");
const { feedbackRouter } = require("./routes/feedback.router");

const app = express();

const port = 7777;

app.use(express.json());
app.use(cookie_parser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://employee-review-system-frontend.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", feedbackRouter);

connectToDatabase()
  .then(() => {
    console.log(`Connected to database successfully..!`);
    app.listen(port, (err) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log(`Connected to Port ${port}..!`);
      }
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
