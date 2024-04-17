const express = require("express");
const ProdcategoryController = require("../controller/ProdcategoryController");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Product Categories
 *   description: API endpoints for managing product categories
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Prodcategory:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the product category.
 *           example: Electronics
 */

/**
 * @swagger
 * /api/categories:
 *   post:
 *     summary: Create a new product category
 *     tags: [Product Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prodcategory'
 *     responses:
 *       201:
 *         description: New product category created successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/", authMiddleware, isAdmin, ProdcategoryController.createCategory);

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all product categories
 *     tags: [Product Categories]
 *     responses:
 *       200:
 *         description: List of product categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Prodcategory'
 */
router.get("/", ProdcategoryController.getallCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     summary: Get a product category by ID
 *     tags: [Product Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product category found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Prodcategory'
 *       404:
 *         description: Product category not found
 */
router.get("/:id", ProdcategoryController.getCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   put:
 *     summary: Update a product category by ID
 *     tags: [Product Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product category
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prodcategory'
 *     responses:
 *       200:
 *         description: Product category updated successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Product category not found
 */
router.put("/:id", authMiddleware, isAdmin, ProdcategoryController.updateCategory);

/**
 * @swagger
 * /api/categories/{id}:
 *   delete:
 *     summary: Delete a product category by ID
 *     tags: [Product Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the product category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product category deleted successfully
 *       404:
 *         description: Product category not found
 */
router.delete("/:id", authMiddleware, isAdmin, ProdcategoryController.deleteCategory);

module.exports = router;
