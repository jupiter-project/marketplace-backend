import AuthAPI from '~/routes/auth';
import NFTAPI from '~/routes/nft';

exports.assignRoutes = app => {

  // * auth API
  app.get('/api/create/passphrase', AuthAPI.createPassphrase);
  app.post('/api/create/jupiter-account', AuthAPI.createJupiterAccount);
  app.post('/api/get/jupiter-account', AuthAPI.getJupiterAccount);

  // * nft API
  app.post('/api/nft-token/create', NFTAPI.createNFTtoken);

}