const express = require("express");
const cors = require("cors");
const app = express();

app.get("/", (req, res) => res.send("payment test demo"));
app.post("/approve", (req, res) => {
  console.log(req.body);
  res.json({ status: "ok" });
});
