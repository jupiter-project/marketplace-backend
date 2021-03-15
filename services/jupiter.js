import axios from 'axios';

exports.getAccountIdByPassphrase = async (passphrase) => {
  const url = `${process.env.JUPITERSERVER}/nxt?requestType=getAccountId&secretPhrase=${passphrase}`;
  return await axios.get(url)
}