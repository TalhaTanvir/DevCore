const express = require("express");
const testimonialController = require("../controllers/testimonial.controller");
const { requireAdmin } = require("../middlewares/admin.middleware");

const router = express.Router();

router.get("/", testimonialController.getPublicTestimonials);

router.get("/admin", requireAdmin, testimonialController.getAdminTestimonials);
router.get("/admin/:id", requireAdmin, testimonialController.getAdminTestimonialById);
router.post("/admin", requireAdmin, testimonialController.createAdminTestimonial);
router.put("/admin/:id", requireAdmin, testimonialController.updateAdminTestimonial);
router.delete("/admin/:id", requireAdmin, testimonialController.deleteAdminTestimonial);

module.exports = router;
