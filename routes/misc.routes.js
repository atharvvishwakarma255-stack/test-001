const express = require("express");
const router = express.Router();
const { testRoute, healthCheck, usersList, sendEmail, syncDocs } = require("../controllers/misc.controller");

router.get("/test", testRoute);
router.get("/health", healthCheck);
router.get("/users", usersList);
router.post("/send-email", sendEmail);
router.post("/sync-docs", syncDocs);

module.exports = router;
