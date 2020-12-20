const express = require("express");
const router = express.Router();

const {
  addCustomer,
  getCustomers,
  fundTransfer,
  UpdateCustomer,
} = require("../controllers/customer.controller");

router.post("/customer", addCustomer);
router.get("/customers", getCustomers);
router.post("/transfer", fundTransfer);
router.put("/customer-update", UpdateCustomer);

module.exports = router;   
