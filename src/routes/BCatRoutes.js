const express = require("express");
const BCatController = require("../controller/BCatController");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Blog Categories
 *   description: API endpoints for managing blog categories
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BCategory:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the blog category.
 */

/**
 * @swagger
 * /api/bcategories:
 *   post:
 *     summary: Create a new blog category
 *     tags: [Blog Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BCategory'
 *     responses:
 *       201:
 *         description: New blog category created successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/", authMiddleware, isAdmin, BCatController.createCategory);

/**
 * @swagger
 * /api/bcategories:
 *   get:
 *     summary: Get all blog categories
 *     tags: [Blog Categories]
 *     responses:
 *       200:
 *         description: List of blog categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BCategory'
 */
router.get("/", BCatController.getallCategory);

/**
 * @swagger
 * /api/bcategories/{id}:
 *   get:
 *     summary: Get a blog category by ID
 *     tags: [Blog Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the blog category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog category found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BCategory'
 *       404:
 *         description: Blog category not found
 */
router.get("/:id", BCatController.getCategory);

/**
 * @swagger
 * /api/bcategories/{id}:
 *   put:
 *     summary: Update a blog category by ID
 *     tags: [Blog Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the blog category
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BCategory'
 *     responses:
 *       200:
 *         description: Blog category updated successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Blog category not found
 */
router.put("/:id",authMiddleware, isAdmin, BCatController.updateCategory);

/**
 * @swagger
 * /api/bcategories/{id}:
 *   delete:
 *     summary: Delete a blog category by ID
 *     tags: [Blog Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the blog category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog category deleted successfully
 *       404:
 *         description: Blog category not found
 */
router.delete("/:id", authMiddleware, isAdmin, BCatController.deleteCategory);

module.exports = router;
