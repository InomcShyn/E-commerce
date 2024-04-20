const User = require("../models/UserModel");
const Cart = require("../models/CartModel");
const Product = require("../models/ProductModel");
const Coupon = require("../models/CouponModel");

class UserRepository {
  async createUser(data) {
    return await User.create(data);
  }

  async getUserByUsername(username) {
    return await User.findOne({ username });
  }

  async getUserByEmail(email) {
    return await User.findOne({ email });
  }

  async getUserByPhone(phone) {
    return await User.findOne({ phone });
  }
  
  async getAllUsers() {
    return await User.find();
  }

  async getUserById(id) {
    return await User.findById(id);
  }

  async blockUser(id) {
    return await User.findByIdAndUpdate(id, { isBlocked: true }, { new: true });
  }

  async unblockUser(id) {
    return await User.findByIdAndUpdate(id, { isBlocked: false }, { new: true });
  }

  async updateUser(id, updatedFields) {
    return await User.findByIdAndUpdate(id, updatedFields, { new: true });
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }
  async getUserWishlist(id) {
    try {
      const findUser = await User.findById(id).populate("wishlist");
      res.json(findUser);
    } catch (error) {
      throw new Error(error);
    }
  }

  async findUserById(userId) {
    return await User.findById(userId);
  }

  // Method to find a user's cart
  async findUserCart(userId) {
    return await Cart.findOne({ orderby: userId });
  }

  // Method to save or update user's cart
  async saveUserCart(userId, cart) {
    let products = [];
    let cartTotal = 0;

    for (let i = 0; i < cart.length; i++) {
      const { _id, count, color } = cart[i];
      const product = await Product.findById(_id).select("price");

      if (product) {
        products.push({
          product: _id,
          count,
          color,
          price: product.price
        });

        cartTotal += product.price * count;
      }
    }

    const existingCart = await Cart.findOne({ orderby: userId });

    if (existingCart) {
      existingCart.products = products;
      existingCart.cartTotal = cartTotal;
      return await existingCart.save();
    } else {
      return await new Cart({
        products,
        cartTotal,
        orderby: userId
      }).save();
    }
  }

  // Method to get user's cart
  async getUserCart(userId) {
    return await Cart.findOne({ orderby: userId }).populate("products.product");
  }

  // Method to empty user's cart
  async emptyCart(userId) {
    return await Cart.findOneAndRemove({ orderby: userId });
  }

  async applyCoupon(userId, couponName) {
    const validCoupon = await Coupon.findOne({ name: couponName });
    if (!validCoupon) {
      throw new Error("Invalid Coupon");
    }
    
    let { cartTotal } = await Cart.findOne({ orderby: userId}).populate("products.product");
    console.log(cartTotal)
    let totalAfterDiscount = (cartTotal - (cartTotal * validCoupon.discount) / 100).toFixed(2);

    await Cart.findOneAndUpdate(
      { orderby: userId },
      { totalAfterDiscount },
      { new: true }
    );

    return totalAfterDiscount;
  }
}



module.exports = new UserRepository();
