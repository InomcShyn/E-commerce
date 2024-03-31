const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL;

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected");
  } catch (error) {
    console.error("Database Connection Error:", error.message);
    process.exit(1); // Exit with failure
  }
};

module.exports = dbConnect;
