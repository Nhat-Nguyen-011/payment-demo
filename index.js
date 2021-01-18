const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 9333;
const fetch = require("node-fetch");
const FormData = require("form-data");

const multer = require("multer");
const upload = multer();

// app.use(express.urlencoded());
app.use(express.json());

app.get("/", (req, res) => res.send("payment test demo"));
app.post("/approve", upload.none(), async (req, res) => {
  const paymentData = req.body;
  console.log(`Payment acknowledgement request received at ${new Date().toISOString()}`);
  console.log(paymentData);
  let result = { test: "OK DOKIE" };
  if (paymentData.P_STATUS && paymentData.P_STATUS == "00") {
    // const body = { P_MID: "INIpayTest", P_TID: paymentData.P_TID };
    // result = await fetch(paymentData.P_REQ_URL, {
    //   method: "post",
    //   body: JSON.stringify(body),
    //   headers: { "Content-Type": "application/json" },
    // });
    // let result1 = await result.text();
    // console.log("This is result after convert to text");
    // console.log(result1);
    const form = new FormData();
    form.append("P_MID", "INIpayTest");
    form.append("P_TID", paymentData.P_TID);
    result = await fetch(paymentData.P_REQ_URL, {
      method: "POST",
      body: form,
    });
    result = await result.text();
    console.log("This is second api result");
    result = JSON.parse('{"' + decodeURI(result.replace(/&/g, '","').replace(/=/g, '":"')) + '"}');
    console.log(result);
  }
  if (result.P_VACT_NUM) return res.json({ accountNumber: result.P_VACT_NUM });
  return res.json({ status: result });
});

// app.post("/noti", upload.none(), async (req, res) => {
//   const paymentData = req.body;
//   console.log(`Vbank notification request received at ${new Date().toISOString()}`);
//   console.log(paymentData);
//   return res.json({ status: "not ok" });
// });

app.post("/noti", async (req, res) => {
  const paymentData = req.body;
  console.log(`Vbank notification request received at ${new Date().toISOString()}`);
  console.log(paymentData);
  return res.json({ status: "not ok" });
});

app.listen(PORT, () => {
  console.log(`App is listen on port ${PORT}`);
});
