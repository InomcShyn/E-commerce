const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRepository = require("../repositories/userRepository");
const productRepository = require("../repositories/productRepository");
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
      res.status(500).json({ error: "Unable to log in" });
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
        id: user._id,
        username: user.username,
        role: user.role,
      });
      res.json({ token: newAccessToken });
    });
  }

  async getAllUsers(req, res) {
    try {
      const users = await userRepository.getAllUsers();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Unable to get users" });
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;
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

  async updateUser(req, res) {
    try {
      const { userId, firstName, lastName, email, phone } = req.body;

      if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
      }

      const updatedFields = {
        firstName,
        lastName,
        email,
        phone,
      };

      // Update user using the UserRepository
      const updatedUser = await userRepository.updateUser(userId, updatedFields);

      res.json({ message: "User updated successfully", user: updatedUser });
    } catch (err) {
      // Handle errors appropriately
      if (err.message === "User not found") {
        return res.status(404).json({ error: "User not found" });
      }
      console.error(err);
      res.status(500).json({ error: "Unable to update user" });
    }
  }

  async blockUser(req, res) {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
      const blockusr = await User.findByIdAndUpdate(
        id,
        {
          isBlocked: true,
        },
        {
          new: true,
        }
      );
      res.json(blockusr);
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async unblockUser(req, res) {
    const { id } = req.params;
    validateMongoDbId(id);

    try {
      const unblock = await UserRepository.unblockUser(id);
      res.json({
        message: "User Unblocked",
        unblock, // Optional: Include the updated user object in the response
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Unable to unblock user" });
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

  async getWishlist(req, res) {
    const userId = req.user;
    try {
      const user = await userRepository.getUserWishlist(userId);
      res.json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async getWishlist(req, res) {
    const userId = req.user._id;
    try {
      const wishlist = await userRepository.getWishlist(userId);
      const user = await userRepository.getUserById(userId);
      res.json({ user, wishlist });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async userCart(req, res) {
    const { cart } = req.body;
    const userId = req.user._id;
    try {
      const userCart = await userRepository.saveUserCart(userId, cart);
      res.json(userCart);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Method to get user's cart
  async getUserCart(req, res) {
    const userId = req.user._id;
    try {
      const userCart = await userRepository.getUserCart(userId);
      res.json(userCart);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // Method to empty user's cart
  async emptyCart(req, res) {
    const userId = req.user._id;
    try {
      await userRepository.emptyCart(userId);
      res.json({ message: "Cart emptied successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
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
