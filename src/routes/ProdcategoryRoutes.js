const express = require("express");
const ProdcategoryController = require("../controller/ProdcategoryController");
const router = express.Router();


router.post("/", ProdcategoryController.createCategory);
router.get("/", ProdcategoryController.getAllCategories);
router.get("/:id", ProdcategoryController.getCategoryById);
router.put("/:id", ProdcategoryController.updateCategory);
router.delete("/:id", ProdcategoryController.deleteCategory);

module.exports = router;
