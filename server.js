
import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';

import { assignRoutes } from '~/routes';

dotenv.config();
const app = express();
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

assignRoutes(app);
app.listen(process.env.SERVER_PORT);
console.log(`🚀 Server listening on port ` + process.env.SERVER_PORT);