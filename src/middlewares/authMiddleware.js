const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const secretKey = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token.replace("Bearer ", ""), secretKey, (err, user) => {
    if (err) {
      const refreshToken = req.header("Refresh-Token");
      if (!refreshToken) {
        return res.status(403).json({ error: "Invalid token" });
      }

      jwt.verify(refreshToken, secretKey, (err, user) => {
        if (err) {
          return res.status(403).json({ error: "Invalid refresh token" });
        }

        const newAccessToken = generateAccessToken({
          id: user.id,
          username: user.username,
          role: user.role
        });

        // Set isAdmin property based on user's role
        const isAdmin = user.role === "admin";

        req.user = {
          ...user,
          isAdmin // Add isAdmin property to req.user
        };
        req.token = newAccessToken;
        next();
      });
    } else {
      // Set isAdmin property based on user's role
      const isAdmin = user.role === "admin";

      req.user = {
        ...user,
        isAdmin // Add isAdmin property to req.user
      };
      next();
    }
  });
}

// Define the generateAccessToken function
function generateAccessToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

module.exports = authMiddleware;
