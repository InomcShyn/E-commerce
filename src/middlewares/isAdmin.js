const dotenv = require("dotenv");

dotenv.config();

function isAdmin(req, res, next) {
    const { role } = req.user;
    if (role !== "admin") {
      return res.status(403).json({ error: "You are not an admin" });
    }
    next();
  }
  
  module.exports = isAdmin;