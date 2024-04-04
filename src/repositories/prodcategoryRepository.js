const Prodcategory = require("../models/ProdcategoryModel");

class ProdcategoryRepository {
  async createCategory(data) {
    return await Prodcategory.create(data);
  }

  async getAllCategories() {
    return await Prodcategory.find();
  }

  async getCategoryById(id) {
    return await Prodcategory.findById(id);
  }

  async updateCategory(id, data) {
    return await Prodcategory.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteCategory(id) {
    return await Prodcategory.findByIdAndDelete(id);
  }
}

module.exports = new ProdcategoryRepository();
