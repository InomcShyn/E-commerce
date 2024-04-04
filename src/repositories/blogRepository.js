const Blog = require("../models/BlogModel");

class BlogRepository {
  async createBlog(data) {
    return await Blog.create(data);
  }

  async getAllBlogs() {
    return await Blog.find();
  }

  async getBlogById(id) {
    return await Blog.findById(id);
  }

  async updateBlog(id, data) {
    return await Blog.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteBlog(id) {
    return await Blog.findByIdAndDelete(id);
  }
}

module.exports = new BlogRepository();
