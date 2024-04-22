const dotenv = require("dotenv");
dotenv.config();

function isAdmin(req, res, next) {
    const { role } = req.user;
    console.log(role)
    if (role !== "Admin") {
      return res.status(403).json({ error: "You are not an admin" });
    }
    next();
  }
  
  module.exports = isAdmin;