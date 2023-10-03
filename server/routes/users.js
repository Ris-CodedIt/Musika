const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user_controller")


// get users
router.get("/users", UserController.get_all_users)
router.get("/single_user/:id", UserController.get_single_user)
router.get("/current_user/:id", UserController.get_current_user)
//  registering a user
router.post("/register", UserController.register_user)
//  updating everything about user
router.post("/update_names/:id", UserController.update_names)
router.post("/update_password/:id", UserController.update_password)
router.post("/update_email/:id", UserController.update_email)
router.post("/update_username/:id", UserController.update_username)

//  admin actions on users
router.get("/set_isadmin/:id", UserController.set_is_admin)
router.get("/revoke_isadmin/:id", UserController.revoke_is_admin)
router.get("/activate_user/:id", UserController.activate_user)
router.get("/deactivate_user/:id", UserController.deactivate_user)
router.get("/reset_password/:id", UserController.admin_reset_password)


module.exports = router