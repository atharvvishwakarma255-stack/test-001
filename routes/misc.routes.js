const express = require("express");
const router = express.Router();
const { home, dashboard, testRoute, test2Route } = require("../controllers/misc.controller");

router.get("/one", home);
router.get("/dashboard", dashboard);
router.get("/hello1", testRoute);
router.get("/test2", test2Route);


module.exports = router;
