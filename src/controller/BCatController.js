const Category = require("../models/BCatModel");
const validateMongoDbId = require("../utils/validateMongodbId");

class BCatController {
  async createCategory(req, res) {
    try {
      const newCategory = await Category.create(req.body);
      res.json(newCategory);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCategory(req, res) {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedCategory);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteCategory(req, res) {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const deletedCategory = await Category.findByIdAndDelete(id);
      res.json(deletedCategory);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCategory(req, res) {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const getaCategory = await Category.findById(id);
      res.json(getaCategory);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getallCategory(req, res) {
    try {
      const getallCategory = await Category.find();
      res.json(getallCategory);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new BCatController();
