const express = require("express");
const app = express();
const PORT = 9333;

const url_decode = require('decode-uri-charset');

const multer = require("multer");
const upload = multer();

//test 1
const rawRouter = express.Router();

rawRouter.use(function(req, res, next) {
  req.rawBody = '';
  req.setEncoding('utf8');

  req.on('data', function(chunk) {
    req.rawBody += chunk;
  });

  req.on('end', function() {
    console.log(req.rawBody);
    next();
  });
});

try {
  rawRouter.post("/noti", upload.none(), async (req, res) => {
    try {
      const paymentDataParam = req.query;
      const paymentData = req.rawBody;

      console.log(url_decode('P_VACCT_NO%3D79013683802571%7CP_EXP_DT%3D20191106', 'euc-kr'));

      return res.json({ status: "OK" });
    } catch (error) {
      console.log(error);
      return res.json({ result: error });
    }
  });
} catch (err) {
  console.log(err);
}

app.use(rawRouter);

app.listen(PORT, () => {
  console.log(`App is listen on port ${PORT}`);
});
