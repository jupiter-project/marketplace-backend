import AuthAPI from '~/routes/auth';
import CloudinaryAPI from '~/routes/cloudinary';

exports.assignRoutes = app => {

  // * auth API
  app.get('/api/create/passphrase', AuthAPI.createPassphrase);
  app.post('/api/create/jupiter-account', AuthAPI.createJupiterAccount);
  app.post('/api/get/jupiter-account', AuthAPI.getJupiterAccount);

  // * nft API
  app.post('/api/cloudinary/upload', CloudinaryAPI.uploadFileCloudinary);

}