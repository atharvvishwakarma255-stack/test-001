const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middlewares/auth");
const { getTemplatePlaceholders } = require("../controllers/templates.controller");

router.get(
  "/api/v1/business/templates/:id/placeholders",
  authenticate, // Bearer authentication middleware
  authorize("business_owner"), // Business owner authorization middleware
  getTemplatePlaceholders
);

module.exports = router;
