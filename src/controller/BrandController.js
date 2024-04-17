const Brand = require("../models/BrandModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

class BrandController {
  async createBrand(req, res) {
    try {
      const newBrand = await Brand.create(req.body);
      res.json(newBrand);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateBrand(req, res) {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedBrand);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteBrand(req, res) {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const deletedBrand = await Brand.findByIdAndDelete(id);
      res.json(deletedBrand);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getBrand(req, res) {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const getaBrand = await Brand.findById(id);
      res.json(getaBrand);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getallBrand(req, res) {
    try {
      const getallBrand = await Brand.find();
      res.json(getallBrand);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new BrandController();
