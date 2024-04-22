// brandRepository.js
const Brand = require("../models/BrandModel");

class BrandRepository {
  async createBrand(data) {
      return await Brand.create(data);
  }

  async updateBrand(id, data) {
    return await Brand.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteBrand(id) {
    return await Brand.findByIdAndDelete(id);
  }

  async getBrandById(id) {
    return await Brand.findById(id);
  }

  async getAllBrands() {
    return await Brand.find();
  }
}

module.exports = new BrandRepository();
