const crypto = require("crypto");

const usersByEmail = new Map();
let nextId = 1;

function hashPassword(password, salt) {
  return crypto.scryptSync(password, salt, 64).toString("hex");
}

class User {
  static findByEmail(email) {
    return usersByEmail.get(email.toLowerCase()) || null;
  }

  static create({ name, email, password }) {
    const salt = crypto.randomBytes(16).toString("hex");
    const record = {
      id: nextId++,
      name,
      email: email.toLowerCase(),
      salt,
      passwordHash: hashPassword(password, salt),
      createdAt: new Date().toISOString(),
    };
    usersByEmail.set(record.email, record);
    return record;
  }

  static verifyPassword(user, password) {
    return hashPassword(password, user.salt) === user.passwordHash;
  }

  static toPublicJSON(user) {
    return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
  }
}

module.exports = User;
