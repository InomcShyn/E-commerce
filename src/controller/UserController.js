const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRepository = require("../repositories/userRepository");
const dotenv = require("dotenv");

dotenv.config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

class UserController {
  async registerUser(req, res) {
    try {
      const { firstName, lastName, email, phone, username, password } = req.body;

      const existingEmail = await userRepository.getUserByEmail(email);
      const existingPhone = await userRepository.getUserByPhone(phone);

      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }

      if (existingPhone) {
        return res.status(400).json({ error: "Phone number already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await userRepository.createUser({
        firstName,
        lastName,
        email,
        phone,
        username,
        password: hashedPassword,
      });

      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Unable to register user" });
    }
  }

  async loginUser(req, res) {
    try {
      const { username, password } = req.body;
      const user = await userRepository.getUserByUsername(username);
  
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      const token = generateAccessToken({
        id: user._id,
        username: user.username,
        role: user.role,
      });
      const refreshToken = generateRefreshToken({
        id: user._id,
        username: user.username,
        role: user.role,
      });
  
      res.json({ token, refreshToken });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Unable to log in. Please try again later." });
    }
  }

  async refreshAccessToken(req, res) {
    const refreshToken = req.header("Refresh-Token");

    if (!refreshToken) {
      return res.status(401).json({ error: "No refresh token provided" });
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ error: "Invalid refresh token" });
      }

      const newAccessToken = generateAccessToken({
        id: user.id,
        username: user.username,
        role: user.role,
      });
      res.json({ token: newAccessToken });
    });
  }


  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const { isAdmin } = req.user; // Get the isAdmin property from the authenticated user

      if (!isAdmin) {
        return res.status(403).json({ error: "Unauthorized. Requires admin role." });
      }

      const user = await userRepository.getUserById(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Unable to get user" });
    }
  }
  
  async getAllUsers(req, res) {
    try {
      const { isAdmin } = req.user; // Get the isAdmin property from the authenticated user

      if (!isAdmin) {
        return res.status(403).json({ error: "Unauthorized. Requires admin role." });
      }

      const users = await userRepository.getAllUsers();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Unable to get users" });
    }
  }
  async blockUser(req, res) {
    try {
      const { id } = req.params;
      const blockedUser = await userRepository.blockUser(id);
      if (!blockedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(blockedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Unable to block user" });
    }
  }

  async unblockUser(req, res) {
    try {
      const { id } = req.params;
      const unblockedUser = await userRepository.unblockUser(id);
      if (!unblockedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(unblockedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Unable to unblock user" });
    }
  }

  async updateUser(req, res) {
    try {
      const { userId, firstName, lastName, email, phone } = req.body;

      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      // Create an object with the updated fields
      const updatedFields = {
        firstName,
        lastName,
        email,
        phone,
      };

      // Call the updateUser method from the repository
      const updatedUser = await userRepository.updateUser(userId, updatedFields);

      // If user is updated successfully, send success response
      res.json({ message: "User updated successfully", user: updatedUser });
    } catch (err) {
      console.error(err);
      // If user not found or any other error occurs, send error response with details
      res.status(500).json({ error: "Unable to update user", details: err.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await userRepository.deleteUser(id);
      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Unable to delete user" });
    }
  }
}

function generateAccessToken(payload) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
}

module.exports = new UserController();
