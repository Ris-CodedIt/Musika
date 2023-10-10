const express = require("express");
const router = express.Router();
const OrdersController = require("../controllers/orders_controller")


router.post("/create_order", OrdersController.create_order)
router.post("/complete_order/:id", OrdersController.complete_order)
router.post("/cancell_order/:id", OrdersController.cancell_order)


router.get("/all_orders", OrdersController.get_orders)
router.get("/single_orders/:id", OrdersController.get_single_order)
router.get("/orders_by_user/:id", OrdersController.get_orders_by_user)
router.get("/orders_by_product/:id", OrdersController.get_orders_by_product)
router.get("/single_order_item/:id", OrdersController.get_single_order_item)



module.exports = router


