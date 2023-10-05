const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/category_controller")


router.post("/register_category", CategoryController.create_category)
router.post("/update_category/:id", CategoryController.update_category)
router.post("/delete_category/:id", CategoryController.delete_category)
router.get("/get_categories", CategoryController.get_categories)



module.exports = router