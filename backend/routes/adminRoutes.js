const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const checkAdmin = require("../middleware/checkAdmin");

const adminController = require("../controller/adminController");

// Routes

// ✅ Create new admin (only existing admins can do this)
router.post(
  "/create-admin",
  auth,
  checkAdmin,
  adminController.registerAdmin
);

// ✅ Get all admins (only admins can view this)
router.get(
  "/all-admins",
  auth,
  checkAdmin,
  adminController.getAllAdmins
);

// ✅ Promote user to admin (only admins can do this)
router.post(
  "/promote",
  auth,
  checkAdmin,
  adminController.promoteToAdmin
);

// ✅ Demote admin to user (only admins can do this)
router.post(
  "/demote",
  auth,
  checkAdmin,
  adminController.demoteAdminToUser
);

module.exports = router;
