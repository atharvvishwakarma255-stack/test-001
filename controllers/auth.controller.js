const crypto = require("crypto");
const User = require("../models/User");

function issueToken() {
  return crypto.randomBytes(24).toString("hex");
}

async function register(req, res) {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "name, email and password are required" });
  }

  if (password.length < 8) {
    return res.status(400).json({ success: false, message: "password must be at least 8 characters" });
  }

  if (User.findByEmail(email)) {
    return res.status(409).json({ success: false, message: "An account with this email already exists" });
  }

  const user = User.create({ name, email, password });
  return res.status(201).json({ success: true, message: "Account created successfully", user: User.toPublicJSON(user), token: issueToken() });
}

async function login(req, res) {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "email and password are required" });
  }

  const user = User.findByEmail(email);
  if (!user || !User.verifyPassword(user, password)) {
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }

  return res.status(200).json({ success: true, message: "Logged in successfully", user: User.toPublicJSON(user), token: issueToken() });
}

module.exports = { register, login };
