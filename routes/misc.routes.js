const express = require("express");
const router = express.Router();
const { healthCheck, usersList, sendEmail, syncDocs, testSync, sendInvoiceReminder } = require("../controllers/misc.controller");


router.get("/health", healthCheck);
router.get("/users", usersList);
router.post("/send-email", sendEmail);
router.post("/sync-docs", syncDocs);
router.post("/test-sync", testSync);
router.post("/send-invoice-reminder/:invoiceId", sendInvoiceReminder);


module.exports = router;
