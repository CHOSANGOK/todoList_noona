const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const cors = require("cors");
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;
const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", indexRouter);

mongoose
  .connect(MONGODB_URI_PROD, { useNewUrlParser: true })
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log("DB connection fail", err);
  });

app.listen(PORT, () => {
  console.log("server on 5000");
});
