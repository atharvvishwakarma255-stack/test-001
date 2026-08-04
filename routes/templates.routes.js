const express = require("express");
const router = express.Router();
const templatesController = require("../controllers/templates.controller");

router.get("/", templatesController.getTemplates);

module.exports = router;
