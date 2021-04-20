
import passport from 'passport';

import UserAPI from '~/routes/user';
import NFTAPI from '~/routes/nft';
import CloudinaryAPI from '~/routes/cloudinary';

exports.assignRoutes = app => {

  // * cloudinary API
  app.post('/api/cloudinary/upload', CloudinaryAPI.uploadFileCloudinary);

  // * nft API
  app.post('/api/nfts', NFTAPI.addNFT);

  // * user API
  app.get('/api/users', passport.authenticate('jwt', { session: false }), UserAPI.getUsers);
  app.get('/api/users/:_id', passport.authenticate('jwt', { session: false }), UserAPI.getUser);
  app.post('/api/users', passport.authenticate('jwt', { session: false }), UserAPI.addUser);
  app.put('/api/users', passport.authenticate('jwt', { session: false }), UserAPI.editUser);
  app.delete('/api/users', passport.authenticate('jwt', { session: false }), UserAPI.removeUser);
}