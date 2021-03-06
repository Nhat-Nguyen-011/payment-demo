const express = require("express");
const app = express();
const PORT = 9333;
const fetch = require("node-fetch");
const FormData = require("form-data");

const url_decode = require("decode-uri-charset");

const multer = require("multer");
const upload = multer();

// OTHER ROUTER EXAMPLE
const otherRouter = express.Router();
otherRouter.use(express.urlencoded());
otherRouter.use(express.json());

otherRouter.get("/paymentTest", (req, res) => {
  const ipAddress =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
  console.log("KG IP ADDRESS:", ipAddress);
  console.log(req.query);
  return res.json({ status: "NOT OK" });
});

//PAYMENT ROUTER EXAMPLE
const paymentRouter = express.Router();

// PAYMENT REGULAR ROUTER FUNCTION
const paymentRegularRouter = express.Router();
paymentRegularRouter.use(express.urlencoded());
paymentRegularRouter.use(express.json());

paymentRegularRouter.get("/", (req, res) => res.send("payment test demo"));
paymentRegularRouter.post("/approve", upload.none(), async (req, res) => {
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

// PAYMENT RAW ROUTER FUNCTION
const paymentRawRouter = express.Router();
paymentRawRouter.use(function (req, res, next) {
  req.rawBody = "";
  req.setEncoding("utf8");

  req.on("data", function (chunk) {
    req.rawBody += chunk;
  });

  req.on("end", function () {
    next();
  });
});

paymentRawRouter.post("/noti", (req, res) => {
  const ipAddress =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    (req.connection.socket ? req.connection.socket.remoteAddress : null);
  console.log("KG IP ADDRESS:", ipAddress);
  console.log("this code run");
  console.log(req.rawBody);
  return res.send("OK");
});

paymentRouter.use("/regular", paymentRegularRouter);
paymentRouter.use("/raw", paymentRawRouter);

app.use("/other", otherRouter);
app.use("/payment", paymentRouter);

app.listen(PORT, () => {
  console.log(`Payment test app in running on port ${PORT}`);
});
