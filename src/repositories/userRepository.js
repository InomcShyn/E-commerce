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
    try {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        updatedFields,
        { new: true }
      );

      // Check if updatedUser is null, which means user was not found
      if (!updatedUser) {
        throw new Error("User not found");
      }

      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Unable to update user");
    }
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }
}


module.exports = new UserRepository();
