const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 9333;
const fetch = require("node-fetch");

const multer = require("multer");
const upload = multer();

app.use(express.urlencoded());
app.use(express.json());

app.get("/", (req, res) => res.send("payment test demo"));
app.post("/approve", upload.none(), async (req, res) => {
  const paymentData = req.body;
  console.log(`Payment acknowledgement request received at ${new Date().toISOString()}`);
  console.log(paymentData);
  if (paymentData.P_STATUS && paymentData.P_STATUS == "00") {
    const body = { P_MID: "INIpayTest", P_TID: paymentData.P_TID };
    let result = await fetch(paymentData.P_REQ_URL, {
      method: "post",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.log("This purchase acknowledgement api call response:");
    console.log(result);
  }
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`App is listen on port ${PORT}`);
});
