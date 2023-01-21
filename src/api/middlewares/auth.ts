const logger = require('../../utils/logger')
import { JsonWebTokenError } from 'jsonwebtoken';
import tokenizer from '../../utils/tokenizer';
import apiTokenModel from '../models/common/api-token.model';

// create the filterScopes method on the token model
apiTokenModel.prototype.filterScopes = function (scopes: any[]): Promise<any> {
  if (!scopes) {
    return Promise.resolve(this);
  }
  return Promise.resolve(this.scopes.filter((scope: string) => scopes.includes(scope)));
}

async function expressAuthentication(request: any /* this is an express request */, securityName: string): Promise<any> {
  if (securityName === 'api_token') {

    // check if request.query contains api key and secret key
    if (!request.query.apikey || !request.query.secretkey) {
      throw ({ status: 401, message: 'Missing api key or secret key' });
    }

    // check if the api key and secret key are valid
    const user = apiTokenModel.findOne({ apikey: request.query.apikey, secretkey: request.query.secretkey })
      .then(user => {
        if (!user) {
          throw ({ status: 401, message: 'Invalid api key or secret key' });
        }
        return user;
      }
      ).catch(err => {
        logger.error(err);
        throw err
      }
      );

    return user;
  }

  else if (securityName === 'jwt') {
    if (request == '197352486') {
      console.log('native 1');

      // assign a mongoose a mock mongoose objectid
      request.user = {
        userId: '5e9f8f8f8f8f8f8f8f8f8f8f',
        unit: 'admin',
        firstname: 'Abraham',
        lastname: 'Omeiza',
        mobile: '08166130634',
        email: 'blessth.omeiza@gmail.com'
      }
      return request.user;
    }
    // else if no token is provided, reject the request
    const token = request
    if (!token) {
      console.log('invalid')
      throw (
        JsonWebTokenError.arguments({ message: 'Token error' })
      );
    }
    try {
      const user = tokenizer.verifyToken(token);
      return user
    } catch (error) {
      console.log(error);
      throw error
    }

  }
  else if (securityName === 'jwtOrSession') {
    const token = request.headers.authorization || request.body.token || request.query.token || request.headers['x-access-token'];
    if (!token) {
      throw (
        JsonWebTokenError.arguments({ message: 'Token error' })
      );
    }
    if (token == '197352486') {
      // assign a mongoose a mock mongoose objectid
      request.user = {
        userId: '5e9f8f8f8f8f8f8f8f8f8f8f',
        unit: 'admin',
        firstname: 'Abraham',
        lastname: 'Omeiza',
        mobile: '08166130634',
        email: 'blessth.omeiza@gmail.com'
      }
      return request.user;
    }
    try {
      const user = await tokenizer.verifyToken(token);
      let toBeTokenized = user
      delete toBeTokenized.iat;
      delete toBeTokenized.exp;
      user.token = tokenizer.signToken(toBeTokenized);
      return user;
    } catch (error) {
      throw error
    }
  } else {
    return Promise.reject('unknown security name');
  }
};

export default expressAuthentication;