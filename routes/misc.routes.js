const express = require("express");
const router = express.Router();
const { testRoute, healthCheck } = require("../controllers/misc.controller");

router.get("/test", testRoute);
router.get("/health", healthCheck);

module.exports = router;
