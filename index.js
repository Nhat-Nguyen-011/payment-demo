const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 9333;

app.get("/", (req, res) => res.send("payment test demo"));
app.post("/approve", (req, res) => {
  console.log("request received");
  console.log(req.body);
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`App is listen on port ${PORT}`);
});
