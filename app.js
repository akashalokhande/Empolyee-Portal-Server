const express = require("express");
const app = express();
const cors = require("cors")
require("dotenv").config();
const APIRouter = require("./Routes/APIRouter");
const mongoose = require("mongoose");
const MONGODB_URI = process.env.database;
PORT = process.env.PORT || 6003;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/empolyee", APIRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("server port is running on", PORT);
    });
  })
  .catch((error) => {
    console.log(" unable to Connect with DB");
    console.log(error);
  });
