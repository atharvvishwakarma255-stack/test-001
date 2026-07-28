const express = require("express");
const router = express.Router();
const { healthCheck, usersList, sendEmail, syncDocs, testSync, registerUser} = require("../controllers/misc.controller");


router.get("/health", healthCheck);
router.get("/users", usersList);
router.post("/send-email", sendEmail);
router.post("/sync-docs", syncDocs);
router.post("/test-sync", testSync);
router.post("/register-user", registerUser);

module.exports = router;
