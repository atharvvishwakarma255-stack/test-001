const express = require("express");
const router = express.Router();
const { testRoute, healthCheck, usersList } = require("../controllers/misc.controller");

router.get("/test", testRoute);
router.get("/health", healthCheck);
router.get("/users", usersList);

module.exports = router;
