// server.js
const express = require("express");
const dotenv = require("dotenv");
const productRoutes = require("./src/routes/ProductRoutes");
const blogRoutes = require("./src/routes/BlogRoutes")
const userRoutes = require("./src/routes/UserRoutes");
const categoryRoutes = require("./src/routes/ProdcategoryRoutes");
const bcateRoutes = require("./src/routes/BCatRoutes");
const brandRouter = require("./src/routes/BrandRoute");
const couponRouter = require("./src/routes/CouponRoute");
const enqRouter = require("./src/routes/EnqRoute");
const connectToDatabase = require("./src/config/dbConnect");
const cors = require("cors"); 
const rateLimitMiddleware = require("./src/middlewares/rateLimitMiddleware");
const swaggerUi = require("swagger-ui-express");
const specs = require("./src/docs/swagger"); 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Apply rate limiting to all requests
app.use(rateLimitMiddleware);
// Enable cors
app.use(
  cors({
    origin: "*",
  })
);

// Middleware
app.use(express.json());

// Connect to MongoDB
connectToDatabase();

// Routes
app.use("/products", productRoutes);
app.use("/blogs", blogRoutes);
app.use("/users", userRoutes);
app.use("/category", categoryRoutes);
app.use("/blogcategory", bcateRoutes);
app.use("/brand", brandRouter);
app.use("/coupon", couponRouter);
app.use("/enquiry", enqRouter);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});