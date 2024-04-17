const BCategory = require("../models/BCatModel");

class BCatRepository {
  async createBCategory(data) {
    return await BCategory.create(data);
  }

  async getAllBCategories() {
    return await BCategory.find();
  }

  async getBCategoryById(id) {
    return await BCategory.findById(id);
  }

  async updateBCategory(id, data) {
    return await BCategory.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteBCategory(id) {
    return await BCategory.findByIdAndDelete(id);
  }
}

module.exports = new BCatRepository();
