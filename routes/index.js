
import AuthAPI from '~/routes/auth';

exports.assignRoutes = app => {
  // * auth API
  app.post('/api/register', AuthAPI.register);
  app.post('/api/login', AuthAPI.login);
}