const express = require("express");
const router = express.Router();
const  BlogController = require("../controller/BlogController");


router.post("/",  BlogController.createBlog);
router.put("/likes",  BlogController.liketheBlog);
router.put("/dislikes", BlogController.disliketheBlog);
router.put("/:id", BlogController.updateBlog);
router.get("/:id", BlogController.getBlog);
router.get("/", BlogController.getAllBlogs);
router.delete("/:id" , BlogController.deleteBlog);

module.exports = router;
