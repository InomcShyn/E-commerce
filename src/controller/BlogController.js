const Blog = require("../models/BlogModel");
const validateMongoDbId = require("../utils/validateMongodbId");

class BlogController {
  async createBlog(req, res) {
    try {
      const newBlog = await Blog.create(req.body);
      res.json(newBlog);
    } catch (error) {
      res.status(500).json({ error: "Unable to create the blog" });
    }
  }

  async updateBlog(req, res) {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedBlog);
    } catch (error) {
      res.status(500).json({ error: "Unable to update the blog" });
    }
  }

  async getBlog(req, res) {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const blog = await Blog.findById(id).populate("likes").populate("dislikes");
      const updatedViews = await Blog.findByIdAndUpdate(
        id,
        { $inc: { numViews: 1 } },
        { new: true }
      );
      res.json(blog);
    } catch (error) {
      res.status(500).json({ error: "Unable to get the blog" });
    }
  }

  async getAllBlogs(req, res) {
    try {
      const blogs = await Blog.find();
      res.json(blogs);
    } catch (error) {
      res.status(500).json({ error: "Unable to get blogs" });
    }
  }

  async deleteBlog(req, res) {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const deletedBlog = await Blog.findByIdAndDelete(id);
      res.json(deletedBlog);
    } catch (error) {
      res.status(500).json({ error: "Unable to delete the blog" });
    }
  }

  async liketheBlog(req, res) {
    const { blogId } = req.body;
    validateMongoDbId(blogId);
    const loginUserId = req?.user?._id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const alreadyDisliked = blog?.dislikes?.includes(loginUserId);
    if (alreadyDisliked) {
      blog.dislikes.pull(loginUserId);
      blog.isDisliked = false;
    }

    const alreadyLiked = blog?.likes?.includes(loginUserId);
    if (alreadyLiked) {
      blog.likes.pull(loginUserId);
      blog.isLiked = false;
    } else {
      blog.likes.push(loginUserId);
      blog.isLiked = true;
    }

    try {
      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } catch (error) {
      res.status(500).json({ error: "Unable to like the blog" });
    }
  }

  async disliketheBlog(req, res) {
    const { blogId } = req.body;
    validateMongoDbId(blogId);
    const loginUserId = req?.user?._id;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    const alreadyLiked = blog?.likes?.includes(loginUserId);
    if (alreadyLiked) {
      blog.likes.pull(loginUserId);
      blog.isLiked = false;
    }

    const alreadyDisliked = blog?.dislikes?.includes(loginUserId);
    if (alreadyDisliked) {
      blog.dislikes.pull(loginUserId);
      blog.isDisliked = false;
    } else {
      blog.dislikes.push(loginUserId);
      blog.isDisliked = true;
    }

    try {
      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } catch (error) {
      res.status(500).json({ error: "Unable to dislike the blog" });
    }
  }
}

module.exports = new BlogController();
