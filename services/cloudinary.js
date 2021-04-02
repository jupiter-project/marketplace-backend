const cloudinary = require('cloudinary').v2;
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

exports.cloudinaryImageUpload = file => cloudinary.uploader.upload(file);
exports.cloudinaryVideoUpload = file => cloudinary.uploader.upload(file, {
  resource_type: "video",
  chunk_size: 6000000,
});
