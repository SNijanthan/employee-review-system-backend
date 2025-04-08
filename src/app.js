const express = require("express");

const app = express();

const port = 7777;

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: true, message: "Hello all, Welcome to this Web page...!" });
});

app.listen(port, (err) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log(`Connected to Port ${port}..!`);
  }
});
