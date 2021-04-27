import messageConstants from '~/constants/message';
import CLOUD_SERVICE from '~/services/cloudinary';
import * as commonConstants from '~/constants/common';

exports.uploadFileCloudinary = async (req, res) => {
  try {
    const { type, fileBuffer } = req.body;
    let uploadResult;
    if (type === commonConstants.FILE_TYPES.VIDEO) {
      uploadResult = await CLOUD_SERVICE.cloudinaryVideoUpload(fileBuffer);
    } else {
      uploadResult = await CLOUD_SERVICE.cloudinaryImageUpload(fileBuffer);
    }

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
