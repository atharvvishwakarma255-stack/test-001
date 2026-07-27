const express = require("express");
const router = express.Router();
const { dashboard, test2Route } = require("../controllers/misc.controller");


router.get("/dashboard", dashboard);
router.get("/test2", test2Route);


module.exports = router;
