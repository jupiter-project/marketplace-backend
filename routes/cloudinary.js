import messageConstants from '~/constants/message';
import CLOUD_SERVICE from '~/services/cloudinary';

exports.uploadFileCloudinary = async (req, res) => {
  try {
    const { fileBuffer } = req.body;
    const uploadResult = await CLOUD_SERVICE.cloudinaryUpload(fileBuffer);

    return res.status(200).json({
      success: true,
      image: uploadResult.secure_url,
      message: messageConstants.UPLOAD_FILE_CLOUDINARY
    });
  } catch (error) {
    console.log('[routes CloudinaryAPI uploadFileCloudinary] error => ', error);
    return res.status(500).json({
      success: false,
      message: messageConstants.SOMETHING_WENT_WRONG
    });
  }
}
