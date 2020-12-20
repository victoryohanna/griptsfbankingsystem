const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerAccount = Schema({
  accountId: {
    type: String,
  },
  accountName: {
    type: String,
  },
  accountNumber: {
    type: Number,
  },
  currentBalance: {
    type: Number,
  },
  
},  { timestamps: true });

const accountModel = mongoose.model("account", customerAccount);
module.exports = accountModel;
