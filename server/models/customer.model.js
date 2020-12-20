const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    gender: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    accountNumber: {
      type: Number,
    },
    currentBalance: {
      type: Number,
    },
  },
  { timestamps: true }
);
const customerModel = mongoose.model("customer", customerSchema);
module.exports = customerModel;
