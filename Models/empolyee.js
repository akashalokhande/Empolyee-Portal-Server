const mongoose = require("mongoose");

const Employschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    match: /^[A-Za-z]+(?: [A-Za-z]+)?$/,
  },
  designation: {
    type: String,
    required: true,
    match: /^[a-zA-Z\-]+$/,
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
  age: {
    type:String,
    required: true,
    match:/^(1[89]|[2-5]\d|60)$/,
  },
  id: {
    type: String,
    required: true,
  },
});

const Empolymodel = mongoose.model("empolyees", Employschema);

module.exports = Empolymodel;
