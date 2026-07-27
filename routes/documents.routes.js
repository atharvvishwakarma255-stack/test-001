const express = require("express");
const router = express.Router();
const requireBusiness = require("../middlewares/requireBusiness");
const { sendDocument } = require("../controllers/documents.controller");

router.post("/api/v1/document/sends", requireBusiness, sendDocument);

module.exports = router;
