// controllers/BCatController.js
const BCatRepository = require("../repositories/bCatRepository");


class BCatController {
  async createCategory(req, res) {
    try {
      const newCategory = await BCatRepository.createCategory(req.body);
      res.json(newCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create category" });
    }
  }

  async updateCategory(req, res) {
    const { id } = req.params;
    try {
      const updatedCategory = await BCatRepository.updateCategory(id, req.body);
      res.json(updatedCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update category" });
    }
  }

  async deleteCategory(req, res) {
    const { id } = req.params;
    try {
      const deletedCategory = await BCatRepository.deleteCategory(id);
      res.json(deletedCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete category" });
    }
  }

  async getCategory(req, res) {
    const { id } = req.params;
    try {
      const category = await BCatRepository.getCategoryById(id);
      res.json(category);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to get category" });
    }
  }

  async getAllCategories(req, res) {
    try {
      const categories = await BCatRepository.getAllCategories();
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to get categories" });
    }
  }
}

module.exports = new BCatController();
