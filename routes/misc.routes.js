const express = require("express");
const router = express.Router();
const { healthCheck, usersList, sendEmail, syncDocs,sendInvoiceReminder2 ,sendInvoiceReminder } = require("../controllers/misc.controller");


router.get("/health", healthCheck);
router.get("/users", usersList);
router.post("/send-email", sendEmail);
router.post("/sync-docs", syncDocs);
router.post("/send-invoice-reminder/:invoiceId", sendInvoiceReminder); 
router.post("/send-invoice-reminder2/:invoiceId", sendInvoiceReminder); 


module.exports = router;
