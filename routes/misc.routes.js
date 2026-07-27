const express = require("express");
const router = express.Router();
const { testRoute } = require("../controllers/misc.controller");

router.get("/test", testRoute);

module.exports = router;
