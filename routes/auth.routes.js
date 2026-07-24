const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/auth.controller");

router.post("/api/v1/auth/register", register);
router.post("/api/v1/auth/login", login);

module.exports = router;
