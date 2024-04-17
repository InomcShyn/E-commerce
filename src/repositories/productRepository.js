const Product = require("../models/ProductModel");

class ProductRepository {
  async createProduct(data) {
    return await Product.create(data);
  }

  async getAllProducts() {
    return await Product.find();
  }

  async getProductById(id) {
    return await Product.findById(id);
  }

  async updateProduct(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }

  async addToWishlist(req, res) {
    const { _id } = req.user;
    const { prodId } = req.body;

    try {
      const updatedUser = await productController.addToWishlist(_id, prodId);
      res.json(updatedUser);
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      res.status(500).json({ error: "Unable to add to wishlist" });
    }
  }

  async rateProduct(product) {
    return await product.save();
  }
}

module.exports = new ProductRepository();
