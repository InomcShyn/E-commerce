const Enquiry = require("../models/EnqModel");
const validateMongoDbId = require("../utils/validateMongodbId");

class EnquiryController {
  async createEnquiry(req, res) {
    try {
      const newEnquiry = await Enquiry.create(req.body);
      res.json(newEnquiry);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateEnquiry(req, res) {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.json(updatedEnquiry);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteEnquiry(req, res) {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
      res.json(deletedEnquiry);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getEnquiry(req, res) {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
      const getaEnquiry = await Enquiry.findById(id);
      res.json(getaEnquiry);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getallEnquiry(req, res) {
    try {
      const getallEnquiry = await Enquiry.find();
      res.json(getallEnquiry);
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = new EnquiryController();
