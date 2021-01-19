const express = require("express");
const app = express();
const PORT = 9333;
const fetch = require("node-fetch");
const FormData = require("form-data");

const url_decode = require("decode-uri-charset");

const multer = require("multer");
const upload = multer();

// const otherRouter = express.Router();
// const paymentRouter = express.Router();

// const paymentRegularRouter = express.Router();
// const paymentRawRouter = express.Router();

//OTHER ROUTER
// otherRouter.use(express.urlencoded());
// otherRouter.use(express.json());

// otherRouter.post("/paymentTest", (req, res) => {
//   console.log(req.body);
//   return res.json({ status: "NOT OK" });
// });

//PAYMENT ROUTER

//PAYMENT REGULAR ROUTER
// paymentRegularRouter.use(express.urlencoded());
// paymentRegularRouter.use(express.json());

// paymentRegularRouter.get("/", (req, res) => res.send("payment test demo"));
// paymentRegularRouter.post("/approve", upload.none(), async (req, res) => {
//   const paymentData = req.body;
//   console.log(`Payment acknowledgement request received at ${new Date().toISOString()}`);
//   console.log(paymentData);
//   let result = { test: "OK DOKIE" };
//   if (paymentData.P_STATUS && paymentData.P_STATUS == "00") {
//     const form = new FormData();
//     form.append("P_MID", "INIpayTest");
//     form.append("P_TID", paymentData.P_TID);
//     result = await fetch(paymentData.P_REQ_URL, {
//       method: "POST",
//       body: form,
//     });
//     result = await result.text();
//     console.log("This is second api result");
//     result = JSON.parse('{"' + decodeURI(result.replace(/&/g, '","').replace(/=/g, '":"')) + '"}');
//     console.log(result);
//   }
//   if (result.P_VACT_NUM) return res.json({ accountNumber: result.P_VACT_NUM });
//   return res.json({ status: result });
// });

//PAYMENT RAW ROUTER
app.use(function (req, res, next) {
  req.rawBody = "";
  req.setEncoding("utf8");

  req.on("data", function (chunk) {
    req.rawBody += chunk;
  });

  req.on("end", function () {
    next();
  });
});

app.post("/noti", (req, res) => {
  console.log("this code run");
  console.log(req.rawBody);
  return res.text("OK");
});

// paymentRouter.use("/regular", paymentRegularRouter);
// paymentRouter.use("/raw", paymentRawRouter);

// app.use("/other", otherRouter);
// app.use("/payment", paymentRouter);

app.listen(PORT, () => {
  console.log(`Payment test app in running on port ${PORT}`);
});
