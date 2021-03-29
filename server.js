
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import passport from 'passport';
import dotenv from 'dotenv';
import compression from 'compression';
import mongoose from 'mongoose';

import { assignRoutes } from '~/routes';
import { RESOURCE_PATH } from '~/constants/common';

dotenv.config();
const app = express();
app.use(passport.initialize());
require('~/passport')(passport);

app.use(bodyParser.json({ limit: '1024mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(compression());

const whitelist = ['*'];
app.disable('x-powered-by');
app.options(whitelist, cors());
app.use(
  cors({
    credentials: true,
    origin(origin, callback) {
      callback(null, true);
    }
  })
);

app.use(`/api/${RESOURCE_PATH}`, express.static(__dirname + `/${RESOURCE_PATH}`));

mongoose.connect(process.env.MONGO_URI,
  {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('mongo connection created');
    assignRoutes(app);
  })
  .catch(err => {
    console.log('error creating db connection: ' + err);
  })

app.listen(process.env.SERVER_PORT);
console.log(`🚀 Server listening on port ` + process.env.SERVER_PORT);