// controllers/productController.js
const productRepository = require("../repositories/productRepository");
const userRepository = require("../repositories/userRepository");
const dotenv = require("dotenv");
const cloudinary = require('cloudinary').v2;
dotenv.config();
class ProductController {
  async createProduct(req, res) {
    try {
      const { files } = req;
      const images = [];
      // Lấy các file có field là images
      for (const file of files) {
          if (file.fieldname.includes("images")) {
              images.push(file);
          }
      }
      // Xử lý lỗi
      for (const file of images) {
        if (file.size / (1024 * 1024) > 30)
        return res.status(401).json({ error: "Cannot upload file with size more than 30mb" });
        if (!file.mimetype.includes('image'))
        return res.status(401).json({ error: "Field thumnail must be image type" });
      }
      const listImagesUrl = [];
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_DB_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
      });
      // Upload file
      for (const image of images) {
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: process.env.CLOUDINARY_FOLDER_IMAGE, resource_type: 'image' },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            ).end(image.buffer);
        });
        listImagesUrl.push({url : result.url, public_id : result.public_id});
    }
      const product = await productRepository.createProduct({
        ...req.body,
        images : listImagesUrl
      });
      res.status(201).json(product);
    } catch (err) {
      console.log(err);
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
      const userId = req.user.id;
      const {productId} = req.body;
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
