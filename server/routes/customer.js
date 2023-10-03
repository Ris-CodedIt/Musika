const express = require("express");
const router = express.Router();
const CustomerController = require("../controllers/customer_controller")


router.post("/register_customer_details/:id", CustomerController.create_customer_details)
router.post("/update_customer_details/:id", CustomerController.update_customer_details)
router.post("/update_membership/:id", CustomerController.update_membership)

//  below will come get customers by membership

module.exports = router

