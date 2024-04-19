const User = require("../models/UserModel");

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
}


module.exports = new UserRepository();
