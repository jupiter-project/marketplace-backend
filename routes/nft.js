
import NFT from '~/database/models/nft';
import User from '~/database/models/user';
import CLOUD_SERVICE from '~/services/cloudinary';
import * as commonConstants from '~/constants/common';
import messageConstants from '~/constants/message';
import { isEmpty } from '~/utils/utility';

exports.addNFT = async (req, res) => {
  try {
    const {
      account,
      accountRS,
      tags,
      type,
      fileBuffer
    } = req.body;

    let uploadResult;
    if (type === commonConstants.FILE_TYPES.VIDEO) {
      uploadResult = await CLOUD_SERVICE.cloudinaryVideoUpload(fileBuffer);
    } else {
      uploadResult = await CLOUD_SERVICE.cloudinaryImageUpload(fileBuffer);
    }

    let user = await User.findOne({ accountRS });
    if (isEmpty(user)) {
      user = await User.create({
        account,
        accountRS
      });
    }

    const nft = await NFT.create({
      user: user._id,
      tags
    });

    return res.status(200).json({
      success: true,
      data: {
        image: uploadResult.secure_url,
        _id: nft._id
      },
      message: messageConstants.CREATE_NFT_SUCCESS
    });
  } catch (error) {
    console.log('[routes NFTAPI addNFT] error => ', error);
    return res.status(500).json({
      message: messageConstants.SOMETHING_WENT_WRONG
    });
  }
};
