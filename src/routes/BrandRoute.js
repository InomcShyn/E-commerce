const express = require("express");
const brandController = require("../controller/BrandController");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");
const router = express.Router();

router.get("/:id", brandController.getBrand);


router.get("/", brandController.getallBrand);


router.post("/", authMiddleware, isAdmin,  brandController.createBrand);


router.put("/:id", authMiddleware, isAdmin,  brandController.updateBrand);


router.delete("/:id", authMiddleware, isAdmin,  brandController.deleteBrand);

module.exports = router;
