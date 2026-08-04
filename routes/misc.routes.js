const express = require("express");
const router = express.Router();
const { healthCheck, usersList, syncDocs, systemStatus, sendInvoiceReminder } = require("../controllers/misc.controller");


router.get("/health", healthCheck);
router.get("/users", usersList);
router.get("/api/v1/system/status", systemStatus);
router.post("/sync-docs", syncDocs);
router.post("/send-invoice-reminder/:invoiceId", sendInvoiceReminder); 


module.exports = router;
