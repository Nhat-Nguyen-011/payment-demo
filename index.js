const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 9333;
const fetch = require("node-fetch");
const FormData = require("form-data");
const bodyParser = require("body-parser");

const multer = require("multer");
const upload = multer();

const defaultRouter = express.Router();
const rawRouter = express.Router();

defaultRouter.use(express.urlencoded());
defaultRouter.use(express.json());
rawRouter.use(bodyParser.urlencoded());
rawRouter.use(express.json());

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

try {
  rawRouter.post("/noti", upload.none(), async (req, res) => {
    try {
      const paymentDataParam = req.query;
      const paymentData = req.body;
      console.log(`Vbank notification request received at ${new Date().toISOString()}`);
      console.log(paymentDataParam);
      console.log(paymentData);
      return res.json({ status: "not ok" });
    } catch (error) {
      console.log(error);
      return res.json({ result: error });
    }
  });
} catch (err) {
  console.log(err);
}

// try {
//   rawRouter.post("/noti", async (req, res) => {
//     try {
//       const paymentDataParam = req.query;
//       const paymentData = req.body;
//       console.log(`Vbank notification request received at ${new Date().toISOString()}`);
//       console.log(paymentDataParam);
//       console.log(paymentData);
//       return res.json({ status: "not ok" });
//     } catch (error) {
//       console.log(error);
//       return res.json({ result: error });
//     }
//   });
// } catch (err) {
//   console.log(err);
// }

app.use(defaultRouter);
app.use(rawRouter);

app.listen(PORT, () => {
  console.log(`App is listen on port ${PORT}`);
});
