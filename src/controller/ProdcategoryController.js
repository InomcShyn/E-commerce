const ProdcategoryRepository = require("../repositories/prodcategoryRepository");

class ProdcategoryController {
  async createCategory(req, res) {
    try {
      const category = await ProdcategoryRepository.createCategory(req.body);
      res.status(201).json(category);
    } catch (err) {
      res.status(500).json({ error: "Unable to create the category" });
    }
  }

  async getAllCategories(req, res) {
    try {
      const categories = await ProdcategoryRepository.getAllCategories();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ error: "Unable to fetch categories" });
    }
  }

  async getCategoryById(req, res) {
    try {
      const category = await ProdcategoryRepository.getCategoryById(req.params.id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (err) {
      res.status(500).json({ error: "Unable to fetch the category" });
    }
  }

  async updateCategory(req, res) {
    try {
      const category = await ProdcategoryRepository.updateCategory(
        req.params.id,
        req.body
      );
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (err) {
      res.status(500).json({ error: "Unable to update the category" });
    }
  }

  async deleteCategory(req, res) {
    try {
      const category = await ProdcategoryRepository.deleteCategory(req.params.id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ error: "Unable to delete the category" });
    }
  }
}

module.exports = new ProdcategoryController();
