const express = require("express");
const router = express.Router();
const BlogController = require("../controller/BlogController");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: API endpoints for managing blogs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - category
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the blog.
 *         description:
 *           type: string
 *           description: Description of the blog.
 *         category:
 *           type: string
 *           description: Category of the blog.
 *         numViews:
 *           type: number
 *           description: Number of views for the blog.
 *         isLiked:
 *           type: boolean
 *           description: Indicates if the blog is liked.
 *         isDisliked:
 *           type: boolean
 *           description: Indicates if the blog is disliked.
 *         likes:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of user IDs who liked the blog.
 *         dislikes:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of user IDs who disliked the blog.
 *         author:
 *           type: string
 *           description: Author of the blog.
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of image URLs for the blog.
 */

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       201:
 *         description: New blog created successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/", authMiddleware, isAdmin, BlogController.createBlog);

/**
 * @swagger
 * /api/blogs/likes:
 *   put:
 *     summary: Like a blog
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: Blog liked successfully
 *       400:
 *         description: Invalid request
 */
router.put("/likes", authMiddleware, BlogController.liketheBlog);

/**
 * @swagger
 * /api/blogs/dislikes:
 *   put:
 *     summary: Dislike a blog
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: Blog disliked successfully
 *       400:
 *         description: Invalid request
 */
router.put("/dislikes", authMiddleware, BlogController.disliketheBlog);

/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     summary: Update a blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the blog
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Blog not found
 */
router.put("/:id", authMiddleware, isAdmin, BlogController.updateBlog);

/**
 * @swagger
 * /api/blogs/{id}:
 *   get:
 *     summary: Get a blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the blog
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Blog not found
 */
router.get("/:id", BlogController.getBlog);

/**
 * @swagger
 * /api/blogs:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blogs]
 *     responses:
 *       200:
 *         description: List of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 */
router.get("/", BlogController.getAllBlogs);

/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     tags: [Blogs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the blog
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 */
router.delete("/:id", authMiddleware, isAdmin, BlogController.deleteBlog);

module.exports = router;
