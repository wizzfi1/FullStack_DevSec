const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("You are safe in Wizfi's pipeline");
});

module.exports = app;
