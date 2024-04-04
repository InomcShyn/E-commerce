const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  cart: { type: Array, default: [] },
  address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  passwordChangedAt: { type: Date },
  passwordResetToken: { type: String },
  passwordResetExpires: { type: Date },
},{
timestamps: { type: Date, default: Date.now }
}
);

const User = mongoose.model("User", userSchema);

module.exports = User;
