import path from 'path';
// Core Dependencies
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import helmet from 'helmet';
import compression from 'compression';
import InitiateMongoServer from './config/db';
import { RegisterRoutes } from './api/routes/routes';
import { NODE_ENV, BASE_URL, FRONT_END_PATH, PUBLIC_DIR, FACEBOOK_TOKEN, FACEBOOK_APP_SECRET, FACEBOOK_PHONE_ID, WHATSAPP_QUESTIONIA_PHONE_ID  } from './config';
import express from "express";
import basicAuth from 'express-basic-auth';
const swaggerDocument = require('../docs/swagger.json');
//import './telegram/telegram';
const logger = require('./utils/logger');
import expressError from './utils/express.error';

// Instance of express
const app: express.Application = express();

//app.use(xhub({ algorithm: 'sha1', secret: FACEBOOK_APP_SECRET || (()=> {throw new Error('FACEBOOK_APP_SECRET is not defined') })() }));
// Initiate Database Connection
InitiateMongoServer();

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
},
));
app.use(compression());
// set end point for ping and respond with pong
app.get('/ping', (req, res) => {
  res.send('pong');
}
);

app.use(cors({
  credentials: true, methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', preflightContinue: false, origin: '*',
}));

RegisterRoutes(app)

// create and start the swagger server
app.use('/api-docs', basicAuth({
  users: { 'admin': 'admin' },
  challenge: true,
  realm: 'Imb4T3st4pp',
}), swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/app', express.static(FRONT_END_PATH));
app.use('/app', (req, res, next) => {
  // create a function to check if the request is for a static file
  const isStaticFile = (req.url.indexOf('.') > -1);
  if (isStaticFile) {
    res.status(404).json({
      message: 'Not Found',
      status: 404,
    });
  } else {
    next()
    // getting here means the content was not found in the backend
    // so we send the user to the frontend and append the url as originalUrl to the query string
    // but split the originalUrl using '/app' as the separator
    // const originalUrl = req.originalUrl.split('/app')[1];
    // console.log('origin', originalUrl)
    // res.redirect(`${BASE_URL}/app?original_url=${originalUrl}`);
  }
});

// catche all successfull requests for static  files
app.use('/', (req, res, next) => {
  // if url is /, then redirect to frontend
  if (req.url === '/' || req.url.indexOf('/app') > -1) {
    res.redirect(`${BASE_URL}app`);
  }

  else {
    // set header to allow caching for 3 days
    res.setHeader('Cache-Control', 'public, max-age=259200');
    next();
  }
})
app.use('/', express.static(PUBLIC_DIR));

app.use('/', (req, res, next) => {
  // if url is /, then redirect to frontend
  if (req.url === '/') {
    res.redirect(`${BASE_URL}app`);
  } else if (req.url.indexOf('/app') === -1 && req.url.indexOf('.') === -1 && req.url.indexOf('/api/') === -1) {
    console.log('redirecting')
    res.redirect(`${BASE_URL}/app?original_url=${req.url}`);
  }
  else {
    // set header to allow caching for 3 days
    res.setHeader('Cache-Control', 'public, max-age=259200');
    next();
  }
  // if not found, then redirect to remove catche and send the request to the frontend
  if (res.statusCode === 404) {
    // remove the cache header
    res.removeHeader('Cache-Control');
  }
})

if (NODE_ENV === 'DEVELOPMENT') {
  app.use(morgan('dev'));
  app.use(helmet());
} else {
  app.use(morgan('tiny'));
}

app.use(expressError);
// Routers


// for every uncaught error, log the error and send a 500 error
process.on('uncaughtException', (err) => {
  logger.error(err);
})

export default app;