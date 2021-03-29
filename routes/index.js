
import passport from 'passport';

import AuthAPI from '~/routes/auth';
import UserAPI from '~/routes/user';
import CloudinaryAPI from '~/routes/cloudinary';

exports.assignRoutes = app => {

  // * nft API
  app.post('/api/cloudinary/upload', CloudinaryAPI.uploadFileCloudinary);

  // * auth API
  app.post('/api/register', AuthAPI.register);
  app.post('/api/login', AuthAPI.login);
  app.post('/api/admin/login', AuthAPI.adminLogin);
  app.post('/api/forgot-password', AuthAPI.forgotPassword);
  app.post('/api/reset-password', AuthAPI.resetPassword);

  // * user API
  app.get('/api/users', passport.authenticate('jwt', { session: false }), UserAPI.getUsers);
  app.get('/api/users/:_id', passport.authenticate('jwt', { session: false }), UserAPI.getUser);
  app.post('/api/users', passport.authenticate('jwt', { session: false }), UserAPI.addUser);
  app.put('/api/users', passport.authenticate('jwt', { session: false }), UserAPI.editUser);
  app.delete('/api/users', passport.authenticate('jwt', { session: false }), UserAPI.removeUser);
}