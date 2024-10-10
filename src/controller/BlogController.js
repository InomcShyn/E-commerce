const BlogRepository = require("../repositories/BlogRepository");
const cloudinaryUploadImg = require("../utils/cloudinary");
const fs = require("fs");

class BlogController {
  async createBlog(req, res) {
    try {
      const newBlog = await BlogRepository.createBlog(req.body);
      res.json(newBlog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create blog" });
    }
  }

 async updateBlog(req, res) {
    const { id } = req.params;
    try {
      const updatedBlog = await BlogRepository.updateBlog(id, req.body);
      res.json(updatedBlog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update blog" });
    }
  }

  async getBlog(req, res) {
    const { id } = req.params;
    try {
      const blog = await BlogRepository.getBlogWithLikesAndDislikes(id);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json(blog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to get blog" });
    }
  }

  async getAllBlogs(req, res) {
    try {
      const blogs = await BlogRepository.getAllBlogs();
      res.json(blogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to get blogs" });
    }
  }

  async deleteBlog(req, res) {
    const { id } = req.params;
    try {
      const deletedBlog = await BlogRepository.deleteBlog(id);
      res.json(deletedBlog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete blog" });
    }
  }

  async liketheBlog(req, res) {
    const { blogId } = req.body;
    try {
      const updatedBlog = await BlogRepository.likeBlog(blogId, req.user._id);
      res.json(updatedBlog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to like blog" });
    }
  }

  async disliketheBlog(req, res) {
    const { blogId } = req.body;
    try {
      const updatedBlog = await BlogRepository.dislikeBlog(blogId, req.user._id);
      res.json(updatedBlog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to dislike blog" });
    }
  }

  async uploadImages(req, res) {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Blog ID is required" });
    }
    try {
      const uploader = (path) => cloudinaryUploadImg(path, "images");
      const urls = [];
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newpath = await uploader(path);
        urls.push(newpath);
        fs.unlinkSync(path);
      }
      const updatedBlog = await BlogRepository.updateBlogImages(id, urls);
      if (!updatedBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json(updatedBlog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new BlogController();
