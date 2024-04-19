// controllers/productController.js
const productRepository = require("../repositories/productRepository");
const userRepository = require("../repositories/userRepository");

class ProductController {
  async createProduct(req, res) {
    try {
      const product = await productRepository.createProduct(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ error: "Unable to create the product" });
    }
  }

  async getAllProducts(req, res) {
    try {
      const products = await productRepository.getAllProducts();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: "Unable to fetch products" });
    }
  }

  async getProductById(req, res) {
    try {
      const product = await productRepository.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: "Unable to fetch the product" });
    }
  }

  async updateProduct(req, res) {
    try {
      const product = await productRepository.updateProduct(
        req.params.id,
        req.body
      );
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: "Unable to update the product" });
    }
  }

  async deleteProduct(req, res) {
    try {
      const product = await productRepository.deleteProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.sendStatus(204);
    } catch (err) {
      res.status(500).json({ error: "Unable to delete the product" });
    }
  }
  
  async addToWishlist(req,res) {
    try {
      const {userId,productId} = req.body
      const user = await userRepository.getUserById(userId);
      if (!user) {
        throw new Error("User not found");
      }

      const alreadyAdded = user.wishlist.includes(productId);

      if (alreadyAdded) {
        user.wishlist.pull(productId);
      } else {
        user.wishlist.push(productId);
      }

      const updatedUser = await user.save();
      return res.status(200).json(updatedUser);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async rateProduct(req, res) {
    const userId = req.user.id;
    const productId = req.params.id;
    const { star, comment } = req.body;
    try {
      const product = await productRepository.getProductById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const alreadyRated = product.ratings.find(
        (rating) => rating.postedBy.toString() === userId.toString()
      );

      if (alreadyRated) {
        return res.status(400).json({ error: "You have already rated this product" });
      }

      product.ratings.push({ star, comment, postedBy: userId });
      const updatedProduct = await productRepository.rateProduct(product);
      res.json(updatedProduct);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}


module.exports = new ProductController();
