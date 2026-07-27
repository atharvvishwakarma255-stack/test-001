const express = require("express");
const router = express.Router();
const { dashboard, testRoute, test2Route, test3Route } = require("../controllers/misc.controller");


router.get("/dashboard", dashboard);
router.get("/hello1", testRoute);
router.get("/test2", test2Route);
router.get("/test3", test3Route);

module.exports = router;
