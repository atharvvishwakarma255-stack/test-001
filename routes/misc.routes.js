const express = require("express");
const router = express.Router();
const { home, dashboard, testRoute, test2Route, health, health3, testById } = require("../controllers/misc.controller");

router.get("/one", home);
router.get("/dashboard", dashboard);
router.get("/hello1", testRoute);
router.get("/test2", test2Route);
router.get("/health2", health);
router.get("/health3", health3);
router.get("/api/v1/test/:id", testById);

module.exports = router;
