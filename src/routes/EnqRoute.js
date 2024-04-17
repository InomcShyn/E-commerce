const express = require("express");
const EnquiryController = require("../controller/EnquiryController");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Enquiries
 *   description: API endpoints for managing enquiries
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Enquiry:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - mobile
 *         - comment
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the person making the enquiry.
 *         email:
 *           type: string
 *           format: email
 *           description: Email of the person making the enquiry.
 *         mobile:
 *           type: string
 *           description: Mobile number of the person making the enquiry.
 *         comment:
 *           type: string
 *           description: Enquiry comment.
 *         status:
 *           type: string
 *           description: Status of the enquiry.
 *           enum: [Submitted, Contacted, In Progress, Resolved]
 *           default: Submitted
 */

/**
 * @swagger
 * /api/enquiries:
 *   post:
 *     summary: Create a new enquiry
 *     tags: [Enquiries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Enquiry'
 *     responses:
 *       201:
 *         description: New enquiry created successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/", EnquiryController.createEnquiry);

/**
 * @swagger
 * /api/enquiries/{id}:
 *   put:
 *     summary: Update an enquiry by ID
 *     tags: [Enquiries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the enquiry
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Enquiry'
 *     responses:
 *       200:
 *         description: Enquiry updated successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Enquiry not found
 */
router.put("/:id", authMiddleware, isAdmin, EnquiryController.updateEnquiry);

/**
 * @swagger
 * /api/enquiries/{id}:
 *   delete:
 *     summary: Delete an enquiry by ID
 *     tags: [Enquiries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the enquiry
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enquiry deleted successfully
 *       404:
 *         description: Enquiry not found
 */
router.delete("/:id", authMiddleware, isAdmin,  EnquiryController.deleteEnquiry);

/**
 * @swagger
 * /api/enquiries/{id}:
 *   get:
 *     summary: Get an enquiry by ID
 *     tags: [Enquiries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the enquiry
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Enquiry found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enquiry'
 *       404:
 *         description: Enquiry not found
 */
router.get("/:id", EnquiryController.getEnquiry);

/**
 * @swagger
 * /api/enquiries:
 *   get:
 *     summary: Get all enquiries
 *     tags: [Enquiries]
 *     responses:
 *       200:
 *         description: List of enquiries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Enquiry'
 */
router.get("/", EnquiryController.getallEnquiry);

module.exports = router;
