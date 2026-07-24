const express = require("express");
const router = express.Router();
const requireBusiness = require("../middlewares/requireBusiness");
const { sendDocument, getDocumentStatus } = require("../controllers/documents.controller");

router.post("/api/v1/document/sends", requireBusiness, sendDocument);
router.get("/api/v1/document/status/:recipientDocumentId", requireBusiness, getDocumentStatus);

module.exports = router;
