const mongoose = require("mongoose");

const userRegisterdetails = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    match:
    /^[A-Za-z]+(?: [A-Za-z]+)?$/,
  },
  Email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
    match:
      /^[a-zA-Z0-9_.+]*[a-zA-Z][a-zA-Z0-9_.+]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  },
  Phone: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
    match: /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
  },
  password: {
    type: String,
    required: true,
    match:/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  },
});

const usermodel = mongoose.model("users",userRegisterdetails);

module.exports = usermodel;
