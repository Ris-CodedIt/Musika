const express = require("express");
const router = express.Router();
const ReviewsController = require("../controllers/reviews_controller")


router.post("/register_review/:id", ReviewsController.create_review)
router.post("/update_review/:id", ReviewsController.update_review)
router.post("/delete_review/:id", ReviewsController.delete_review)



module.exports = router


