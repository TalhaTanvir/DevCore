const express = require("express");
const cloudinaryController = require("../controllers/cloudinary.controller");
const { requireAdmin } = require("../middlewares/admin.middleware");

const router = express.Router();

router.post("/admin/sign-upload", requireAdmin, cloudinaryController.signUpload);
router.delete("/admin/assets", requireAdmin, cloudinaryController.deleteAsset);

module.exports = router;
