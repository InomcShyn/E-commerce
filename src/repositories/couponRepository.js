// couponRepository.js
const Coupon = require("../models/CouponModel");

class CouponRepository {
  async createCoupon(couponData) {
    try {
      return await Coupon.create(couponData);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllCoupons() {
    try {
      return await Coupon.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCoupon(id, updatedData) {
    try {
      return await Coupon.findByIdAndUpdate(id, updatedData, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteCoupon(id) {
    try {
      return await Coupon.findByIdAndDelete(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCouponById(id) {
    try {
      return await Coupon.findById(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new CouponRepository();
