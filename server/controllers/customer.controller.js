const Customer = require("../models/customer.model");
const Transaction = require("../models/transaction.model");

//Post
const addCustomer = (req, res) => {
  Customer.findOne({ email: req.body.email }, (err, response) => {
    if (err) {
      res.status(500).json({
        message: "Error found",    
      });
    }

    if (response) {
      return res.status(400).json({ message: "Customer already registerred" });
    }

    let customer = new Customer(req.body);
    customer.save().then((data) => {
      return res.status(200).json({
        message: "Saved",
        data,
      });
    });
  });
};

const getCustomers = (req, res) => {
  Customer.find((err, response) => {
    if (err) {
      return res.status(500).json({ status: err });
    }
    if (!response) {
      return res.status(400).json({
        message: " Records not available",
      });
    }
    return res.status(200).json({
      status: "ok",
      response,
    });  
  });
};

//Transfer fund

const fundTransfer = (req, res) => {
  Transaction.findOne(
    (err) => {
      if (err) {
        console.log(err)
        res.status(500).json({
          message: "Server Error Try again",
        });
      }

      let transfer = new Transaction(req.body);
      transfer.save().then((data) => {
        return res.status(200).json({
          message: "Saved",
          data,
        });
      });
    }
  );
};

const getTransactions = (req, res) => {
  Transaction.find((err, response) => {
    if (err) {
      return res.status(500).json({ status: err });
    }
    if (!response) {
      return res.status(400).json({
        message: " Records not available",
      });
    }
    return res.status(200).json({
      status: "ok",
      response,
    });
  });
};

const UpdateCustomer = async (req, res) => {
  await Customer.findOneAndUpdate(
    { email: req.body.email },
    {
      $set: {
        userId: req.body.userId,
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        accountNumber: req.body.accountNumber,
        currentBalance: req.body.currentBalance,
      },
    },

    (err, response) => {
      if (err) {
        return res.status(500).json({ message: "Error Occurred" });
        //console.log(err);
      }
      if (!response) {
        return res.status(400).json({ message: "Record not found" });
      }

      return res.status(200).json({
        status: "ok",
        response,
      });
    }
  );
};

module.exports = {
  addCustomer,
  getCustomers,
  fundTransfer,
  getTransactions,
  UpdateCustomer,
};
