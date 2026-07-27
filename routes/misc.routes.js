const express = require("express");
const router = express.Router();
const { testRoute, healthCheck, usersList, sendEmail } = require("../controllers/misc.controller");

router.get("/test", testRoute);
router.get("/health", healthCheck);
router.get("/users", usersList);
router.post("/send-email", sendEmail);

module.exports = router;
