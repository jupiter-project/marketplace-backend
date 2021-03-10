import axios from 'axios';

import { gravity } from '~/libs/gravity';

exports.getAccountIdByPassphrase = async (passphrase) => {
  const url = `${process.env.JUPITERSERVER}/nxt?requestType=getAccountId&secretPhrase=${passphrase}`;
  return await axios.get(url)
}