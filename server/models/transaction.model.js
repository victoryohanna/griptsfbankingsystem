const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = Schema(
  {
    transactionId: {
      type: String,
    },
    customer: {
      firstName: {
        type: String,
      },
      middleName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      accountNumber: {   
        type: String,
      },
      initialBalance: {
        type: Number,
      },
      amountReceived: {
        type: Number,
      },
      newBalance: {
        type: Number,
      },
    },  
    depositor: {
      name: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
      email: {
        type: String,
      },
    },
    date: {
      type: Date,   
    },
  },
);

const transactionModel = mongoose.model("transaction", transactionSchema);
module.exports = transactionModel;


