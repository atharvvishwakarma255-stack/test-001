const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth");
const { sendInvoice, getInvoice } = require("../controllers/invoices.controller");

router.post("/api/v1/invoices/:invoiceId/send", authenticate, sendInvoice);

router.get("/api/v1/invoices/:invoiceId", authenticate, getInvoice);

module.exports = router;
