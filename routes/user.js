
import User from '~/database/models/user';
import commonConstants from '~/constants/common';
import messageConstants from '~/constants/message';
import utility from '~/utils/utility';

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.status(200).send(users);
  } catch (error) {
    console.log('[routes UserAPI getUsers] error => ', error);
    return res.status(500).json({
      message: messageConstants.SOMETHING_WENT_WRONG
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { accountRS } = req.params;
    const user = await User.findOne({ accountRS });
    return res.status(200).send(user);
  } catch (error) {
    console.log('[routes UserAPI getUser] error => ', error);
    return res.status(500).json({
      message: messageConstants.SOMETHING_WENT_WRONG
    });
  }
};

exports.addUser = async (req, res) => {
  try {
    let user = req.body;
    let currentUser = {};

    if (!!user.accountRS) {
      currentUser = await User.findOne({ accountRS });
      if (!utility.isEmpty(currentUser)) {
        return res.status(500).json({
          message: messageConstants.USER_DUPLICATE_EMAIL_ERROR
        });
      }
    }

    user = await User.create(user);
    return res.status(200).send(user);
  } catch (error) {
    console.log('[routes UserAPI addUser] error => ', error);
    return res.status(500).json({
      message: messageConstants.SOMETHING_WENT_WRONG
    });
  }
};

exports.editUser = async (req, res) => {
  try {
    let user = req.body;
    let currentUser = {};

    if (!!user.accountRS) {
      currentUser = await User.findOne({ accountRS });
      if (!utility.isEmpty(currentUser) && user._id !== currentUser._id.toString()) {
        return res.status(500).json({
          message: messageConstants.USER_DUPLICATE_EMAIL_ERROR
        });
      }
    }

    user = await User.findOneAndUpdate({ _id: user._id }, { $set: user }, { new: true });
    return res.status(200).send(user);
  } catch (error) {
    console.log('[routes UserAPI editUser] error => ', error);
    return res.status(500).json({
      message: messageConstants.SOMETHING_WENT_WRONG
    });
  }
};

exports.removeUser = async (req, res) => {
  try {
    const _id = req.query._id;
    if (req.user.id !== _id && req.user.type !== commonConstants.PROFILE_TYPES.ADMIN.VALUE) {
      return res.status(401).json({
        message: messageConstants.PERMISSION_MANAGE_USER_ERROR
      });
    }

    const user = await User.findOneAndDelete({ _id });
    return res.status(200).send(user);
  } catch (error) {
    console.log('[routes UserAPI removeUser] error => ', error);
    return res.status(500).json({
      message: messageConstants.SOMETHING_WENT_WRONG
    });
  }
};