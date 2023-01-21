const mongoose = require('mongoose');
const logger = require('../utils/logger');
const throwError = require('../utils/handle-error');
import User from "../api/models/User.model";

const InitiateMongoServer = async () => {
  const { DATABASE_URL } = require('./index');
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(DATABASE_URL, {

      useNewUrlParser: true,
      useUnifiedTopology: true,
      // set database name to match the database name in the mongodb
      dbName: 'express_typescript_skeleton',
    });
    logger.info('Connected to DB');
     try {
      User.count({ invitationID: '62c055401b41f1b2a6ab82e2'}, (err:any,count):any => {
        if (err || count < 1) {
          console.log(count);
          
          console.log('create mock worker');
          
          User.create(
          {
            invitationID: "62c055401b41f1b2a6ab82e2",
            userId: "62c055401b41f1b2a6ab82e2",
            invitedBy: "62c055401b41f1b2a6ab82e2",
            firstName: 'Abraham Omeiza',
            lastName: 'Abdulraheem',
            email: 'blesseth.omeiza@gmail.com',
            mobile: '08166130634',
            unit: 'admin',
            password: null,
          })

        } else {
          console.log(count);
          
        }
      })
   } catch (err:any) { console.log(err)}
  } catch (ex:any) {
    logger.log({
      level: 'error',
      message: ex.message,
    });
  }
};

export default InitiateMongoServer;
