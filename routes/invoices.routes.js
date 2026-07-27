const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth");
const { sendInvoice } = require("../controllers/invoices.controller");

router.post("/api/v1/invoices/:invoiceId/send", authenticate, sendInvoice);

router.post("/api/v1/invoices2/:invoiceId/send", authenticate, sendInvoice);

module.exports = router;
