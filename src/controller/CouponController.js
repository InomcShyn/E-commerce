const Coupon = require("../models/CouponModel");
const validateMongoDbId = require("../utils/validateMongodbId");

class CouponController {
  async createCoupon(req, res) {
    try {
      const newCoupon = await Coupon.create(req.body);
      res.json(newCoupon);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllCoupons(req, res) {
    try {
      const coupons = await Coupon.find();
      res.json(coupons);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCoupon(req, res) {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedCoupon);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteCoupon(req, res) {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const deletedCoupon = await Coupon.findByIdAndDelete(id);
      res.json(deletedCoupon);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCoupon(req, res) {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const getCoupon = await Coupon.findById(id);
      res.json(getCoupon);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new CouponController();
