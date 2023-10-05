const express = require("express");
const router = express.Router();
const ReviewsController = require("../controllers/reviews_controller")


router.post("/register_review/:id", ReviewsController.create_review)
router.post("/update_review/:id", ReviewsController.update_review)
router.post("/delete_review/:id", ReviewsController.delete_review)
router.get("/product_review/:id", ReviewsController.get_product_reviews)
router.get("/product_review_by_user/:id", ReviewsController.get_product_reviews_by_user)



module.exports = router


