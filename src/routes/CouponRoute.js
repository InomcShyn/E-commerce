const express = require("express");
const CouponController = require("../controller/CouponController");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Coupons
 *   description: API endpoints for managing coupons
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Coupon:
 *       type: object
 *       required:
 *         - name
 *         - expiry
 *         - discount
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the coupon.
 *         expiry:
 *           type: string
 *           format: date
 *           description: Expiry date of the coupon.
 *         discount:
 *           type: number
 *           format: float
 *           description: Discount percentage of the coupon.
 */

/**
 * @swagger
 * /api/coupons:
 *   post:
 *     summary: Create a new coupon
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Coupon'
 *     responses:
 *       201:
 *         description: New coupon created successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/", authMiddleware, isAdmin, CouponController.createCoupon);

/**
 * @swagger
 * /api/coupons:
 *   get:
 *     summary: Get all coupons
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of coupons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coupon'
 */
router.get("/", authMiddleware, isAdmin, CouponController.getAllCoupons);

/**
 * @swagger
 * /api/coupons/{id}:
 *   get:
 *     summary: Get a coupon by ID
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the coupon
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coupon found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       404:
 *         description: Coupon not found
 */
router.get("/:id", authMiddleware, isAdmin,  CouponController.getCoupon);

/**
 * @swagger
 * /api/coupons/{id}:
 *   put:
 *     summary: Update a coupon by ID
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the coupon
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Coupon'
 *     responses:
 *       200:
 *         description: Coupon updated successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Coupon not found
 */
router.put("/:id", authMiddleware, isAdmin,  CouponController.updateCoupon);

/**
 * @swagger
 * /api/coupons/{id}:
 *   delete:
 *     summary: Delete a coupon by ID
 *     tags: [Coupons]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the coupon
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Coupon deleted successfully
 *       404:
 *         description: Coupon not found
 */
router.delete("/:id", authMiddleware, isAdmin, CouponController.deleteCoupon);

module.exports = router;
