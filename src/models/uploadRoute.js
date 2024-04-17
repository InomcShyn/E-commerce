const express = require("express");
const { uploadImages, deleteImages } = require("../controller/uploadCtrl");
const  authMiddleware  = require("../middlewares/authMiddleware");
const isAdmin = require ("../middlewares/isAdmin");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImage");
const router = express.Router();

router.post(
  "/",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);

router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;