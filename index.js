const express = require("express");
const app = express();
const PORT = 9333;
const fetch = require("node-fetch");
const FormData = require("form-data");

const url_decode = require("decode-uri-charset");

const multer = require("multer");
const upload = multer();

const defaultRouter = express.Router();
defaultRouter.use(express.urlencoded());
defaultRouter.use(express.json());

defaultRouter.get("/", (req, res) => res.send("payment test demo"));
defaultRouter.post("/approve", upload.none(), async (req, res) => {
  const paymentData = req.body;
  console.log(`Payment acknowledgement request received at ${new Date().toISOString()}`);
  console.log(paymentData);
  let result = { test: "OK DOKIE" };
  if (paymentData.P_STATUS && paymentData.P_STATUS == "00") {
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

//START VBANK TEST

//test 1
const rawRouter = express.Router();

rawRouter.use(function (req, res, next) {
  req.rawBody = "";
  req.setEncoding("utf8");

  req.on("data", function (chunk) {
    req.rawBody += chunk;
  });

  req.on("end", function () {
    console.log(req.rawBody);
    next();
  });
});

rawRouter.post("/noti", upload.none(), async (req, res) => {
  const paymentData = req.rawBody;

  console.log(paymentData);

  return res.json({ status: "OK" });
});

app.use(defaultRouter);
app.use(rawRouter);

app.listen(PORT, () => {
  console.log(`App is listen on port ${PORT}`);
});
