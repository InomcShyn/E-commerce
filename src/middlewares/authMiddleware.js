const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const asyncHandler = require("express-async-handler");

dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

const authMiddleware = asyncHandler(async (req, res, next) => {
  const accessToken = req.header("Authorization");

  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(accessToken.replace("Bearer ", ""), ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      const refreshToken = req.header("Refresh-Token");
      if (!refreshToken) {
        return res.status(403).json({ error: "Invalid token" });
      }

      jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ error: "Invalid refresh token" });
        }

        const newAccessToken = generateAccessToken({
          id: user.id,
          username: user.username,
          role: user.role  // Include the role in the new access token
        });
        req.user = user;
        req.token = newAccessToken;
        next();
      });
    } else {
      req.user = user; 
      req.user.role = user.role 
      next();
    }
  });
});


function generateAccessToken(payload) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

module.exports =  authMiddleware;