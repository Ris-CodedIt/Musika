const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product_controller")


//  get products data

router.get("/all", ProductController.get_all_products)
router.get("/all_published", ProductController.get_published_products)
router.get("/all_unpublished", ProductController.get_unpublished_products)
router.get("/all_deleted", ProductController.get_deleted_products)
router.get("/single_product/:id", ProductController.get_single_product)

// create product
router.post("/register_product", ProductController.create_product)
router.post("/update_product/:id", ProductController.update_product)
router.post("/update_product_category/:id", ProductController.update_product_category)
router.post("/update_product_image/:id", ProductController.update_product_image)


// admin actions on products
router.post("/publish_product/:id", ProductController.publish_product)
router.post("/unpublish_product/:id", ProductController.unpublish_product)
router.post("/publish_all", ProductController.publish_all_products)
router.post("/unpublish_all", ProductController.unpublish_all_products)


module.exports = router












