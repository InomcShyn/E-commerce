// BrandController.js
const brandRepository = require("../repositories/BrandRepository");

class BrandController {
  async createBrand(req, res) {
    try {
      const newBrand = await brandRepository.createBrand(req.body);
      res.json(newBrand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateBrand(req, res) {
    const { id } = req.params;
    try {
      const updatedBrand = await brandRepository.updateBrand(id, req.body);
      res.json(updatedBrand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteBrand(req, res) {
    const { id } = req.params;
    try {
      const deletedBrand = await brandRepository.deleteBrand(id);
      res.json(deletedBrand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getBrand(req, res) {
    const { id } = req.params;
    try {
      const getaBrand = await brandRepository.getBrandById(id);
      res.json(getaBrand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllBrand(req, res) {
    try {
      const getAllBrand = await brandRepository.getAllBrands();
      res.json(getAllBrand);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new BrandController();
