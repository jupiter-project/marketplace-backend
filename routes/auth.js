import { gravity } from '~/libs/gravity';
import * as jupiterService from '~/services/jupiter';
import messageConstants from '~/constants/message';
import { isEmpty } from '~/utils/utility';

exports.createPassphrase = (req, res) => {
  try {
    const passphrase = gravity.generate_passphrase();

    return res.status(200).json({
      success: true,
      result: passphrase,
      message: messageConstants.CREATE_PASSPHRASE_SUCCESS
    });
  } catch (error) {
    console.log('[routes AuthAPI createPassphrase] error => ', error);
    return res.status(500).json({
      success: false,
      message: messageConstants.SOMETHING_WENT_WRONG
    });
  }
}

exports.createJupiterAccount = async (req, res) => {
  try {
    const { passphrase = '' } = req.body;

    const { data = {} } = await jupiterService.getAccountIdByPassphrase(passphrase);

    if (isEmpty(data.accountRS)) {
      return res.status(500).json({
        success: false,
        transaction: data,
        message: messageConstants.TRANSACTION_ERROR
      });
    }

    const account = {
      account: data.accountRS,
      public_key: data.publicKey,
      alias: data.alias,
      jup_account_id: data.account,
    };

    return res.status(200).json({
      success: true,
      result: account,
      message: messageConstants.CREATE_JUPITER_ACCOUNT
    });
  } catch (error) {
    console.log('[routes AuthAPI createJupiterAccount] error => ', error);
    return res.status(500).json({
      success: false,
      message: messageConstants.SOMETHING_WENT_WRONG
    });
  }
}

exports.getJupiterAccount = async (req, res) => {
  try {
    const { passphrase = '' } = req.body;

    const { data = {} } = await jupiterService.getAccountIdByPassphrase(passphrase);
    const result = {
      account: data.accountRS,
      accounthash: data.accountRS,
      public_key: data.publicKey,
    }

    return res.status(200).json({
      success: true,
      result,
      message: messageConstants.GET_JUPITER_ACCOUNT
    });
  } catch (error) {
    console.log('[routes AuthAPI getJupiterAccount] error => ', error);
    return res.status(500).json({
      success: false,
      message: messageConstants.SOMETHING_WENT_WRONG
    });
  }
}