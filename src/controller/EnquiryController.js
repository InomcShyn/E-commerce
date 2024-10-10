// controllers/EnquiryController.js
const EnquiryRepository = require("../repositories/enquiryRepository");

class EnquiryController {
  async createEnquiry(req, res) {
    try {
      const newEnquiry = await EnquiryRepository.createEnquiry(req.body);
      res.json(newEnquiry);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to create enquiry" });
    }
  }

  async updateEnquiry(req, res) {
    const { id } = req.params;
    try {
      
      const updatedEnquiry = await EnquiryRepository.updateEnquiry(id, req.body);
      res.json(updatedEnquiry);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update enquiry" });
    }
  }

  async deleteEnquiry(req, res) {
    const { id } = req.params;
    try {
      
      const deletedEnquiry = await EnquiryRepository.deleteEnquiry(id);
      res.json(deletedEnquiry);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to delete enquiry" });
    }
  }

  async getEnquiry(req, res) {
    const { id } = req.params;
    try {
      
      const enquiry = await EnquiryRepository.getEnquiryById(id);
      res.json(enquiry);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to get enquiry" });
    }
  }

  async getAllEnquiries(req, res) {
    try {
      const enquiries = await EnquiryRepository.getAllEnquiries();
      res.json(enquiries);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to get enquiries" });
    }
  }
}

module.exports = new EnquiryController();
