const express = require("express");
const router = express.Router();
const AuditController = require("../controllers/audit_controller")


router.get("/audit_trails", AuditController.getAllAudittrails)
router.get("/user_audit_trails/:id", AuditController.getUserAudittrails)


module.exports = router