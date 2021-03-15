import messageConstants from '~/constants/message';
import CLOUD_SERVICE from '~/services/cloudinary';

exports.createNFTtoken = async (req, res) => {
  try {
    const { fileBuffer, ...rest } = req.body;

    const uploadResult = await CLOUD_SERVICE.cloudinaryUpload(fileBuffer);
    const response = {
      ...rest,
      product: uploadResult.secure_url
    }

    return res.status(200).json({
      success: true,
      data: response,
      message: messageConstants.CREATE_NFT_TOKEN
    });
  } catch (error) {
    console.log('[routes nftAPI createNFTtoken] error => ', error);
    return res.status(500).json({
      success: false,
      message: messageConstants.SOMETHING_WENT_WRONG
    });
  }
}
