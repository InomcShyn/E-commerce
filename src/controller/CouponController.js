// BrandController.js
const couponRepository = require("../repositories/couponRepository");

class CouponController {
  async createCoupon(req, res) {
    try {
      const coupon = await couponRepository.createCoupon(req.body);
      res.status(201).json(coupon);
    } catch (error) {
      res.status(500).json({ error: "Unable to create the coupon" });
    }
  }

  async getAllCoupons(req, res) {
    try {
      const coupons = await couponRepository.getAllCoupons();
      res.json(coupons);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateCoupon(req, res) {
    const { id } = req.params;
    try {
      const updatedCoupon = await couponRepository.updateCoupon(id, req.body);
      res.json(updatedCoupon);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteCoupon(req, res) {
    const { id } = req.params;
    try {
      const deletedCoupon = await couponRepository.deleteCoupon(id);
      res.json(deletedCoupon);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCoupon(req, res) {
    const { id } = req.params;
    try {
      const getCoupon = await couponRepository.getCouponById(id);
      res.json(getCoupon);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new CouponController();
