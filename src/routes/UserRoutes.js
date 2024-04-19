const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");
const authMiddleware  = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin")

/**
 * @swagger
 * tags:
 *   name: Users
 * 
 *   description: API endpoints for managing users
 */

// POST /users/register
router.post("/register", userController.registerUser);

// POST /users/login
router.post("/login", userController.loginUser);

router.put("/:id", authMiddleware, userController.updateUser);

// GET /users/wishlist
router.get("/wishlist", authMiddleware, userController.getWishlist);

// GET /users/getallusers
router.get("/getallusers", authMiddleware, isAdmin, userController.getAllUsers);

// GET /users/getuser/{id}
router.get("/getuser/:id", authMiddleware, isAdmin, userController.getUserById);

// DELETE /users/deleteuser/{id}
router.delete("/deleteuser/:id", authMiddleware, userController.deleteUser);

router.put("/block-user/:id", authMiddleware, isAdmin, userController.blockUser);

router.put("/unblock-user/:id", authMiddleware, isAdmin, userController.unblockUser);

router.delete("/empty-cart", authMiddleware, userController.emptyCart);

router.post("/cart", authMiddleware, userController.userCart);

router.get("/cart", authMiddleware, userController.getUserCart);

module.exports = router;
