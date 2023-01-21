import validator from 'validator'
const logger: any = require('../../utils/logger')
import { hashPassword, checkPassword } from '../../utils/password'
//import { sendMail, sendSms } from '../../utils/send-sms-email-token'
import { handleCastErrorExceptionForInvalidObjectId, isCastError, throwError } from '../../utils/handle-error'
import * as googleAuth from '../../utils/google-auth'
import User from '../models/user.model'
import tokenizer from '../../utils/tokenizer'

export class workerService {
  // pre registers a user with the given email or mobile
  async preRegister(resource: { invitationId:string, invitedBy:any, email?: string; mobile?:string,unit: string }) {
    try {
    const newWorker = await User.create(resource)

    return await getResponse(newWorker)
    } catch (err: any) {
      throw ({ message: 'Worker not created', error: err, status: 404 })
    }
  }

  // check if the user was invited by the admin with the given invitationID
  async checkInvitation(user: string) {
    try {
      const worker = await User.findOne({ $or: [ {_id: user}, { mobile: user }, { email: user }] }).orFail(():any => 'invitation not found')
      return await getResponse(worker)
    } catch (err: any) {
      throw ({ message: err.message || 'Invitation not found', error: err, status: err.status || err.errorStatus || 404 })
    }
  }

  /**
   * @description create a sendEmail function that will send an email to the user
   * @param {string} emailAddress - The user's email.
   * @param {string} subject - The email's subject.
   * @param {string} message - The email's message.
   * @returns {Promise< true | Error>} - true if the email was sent successfully
   * @memberof workerService
   * @author - A_Omeiza
   * 
   * 
   * this is not implemented yet
  async sendEmail(resource: {emailAddress: string, subject: string, message: string}): Promise<true | Error> {
    try {
      const { emailAddress, subject, message } = resource;
      await sendMail(emailAddress, subject, message)
      return true;
    } catch (err: any) {
      throw ({ message: 'Email not sent', error: err, status: 404 })
    }
  }

  **/

  /**
   * @description  create a function that will send an sms to the user
   * @param {string} mobile - The user's mobile.
   * @param {string} message - The sms's message.
   * @returns {Promise< true | Error>} - true if the sms was sent successfully
   *
   * 
   * 
   * this is not implemented yet
  async sendSms(resource: {mobile: string, message: string}): Promise<true | Error> {
    try {
      const { mobile, message } = resource;
      await sendSms(mobile, message)
      return true;
    } catch (err: any) {
      throw ({ message: 'Sms not sent', error: err, status: 400 })
    }
  }

  **/
  /**
 * @function createLogin
 * @description - This is the first step to signup a user.
 * @param {string} password - The new password.
 * @param {string} invitationID - the user's invitation id.
 * @param {string} passwordResetToken - the user's token.
 * @returns {Promise<any>} - The user id.
 * @memberof workerService
 * @author - A_Omeiza
 * @utility - This is the first step to signup a user.
 * @utilizes - checkInvitation.
 * @throws - Error if the user was not found.
 */
  async createLogin(resource: { password: string, invitationId: string, token: number, tokenRoute: 'email' | 'mobile' }): Promise<any> {
    try {
      const { token, invitationId, tokenRoute } = resource;
      resource.password = await hashPassword(resource.password)
      // find worker with the given invitationID and update the password, set the passwordResetToken to null and set the passwordResetExpires to null
      const worker = await User.findOneAndUpdate(
      { invitationId: invitationId, [`${tokenRoute}Token`]: token},
        { $set: { ...resource, passwordResetToken:null, [`${tokenRoute}Token`]:null } },
      ).orFail(new Error('Token not valid or expired'))
      return await getResponse(worker)
    } catch (err: any) {
      throw ({ message: err.message || 'User not found', error: err, status: 404 })
    }
  }


  // verify the token sent to the user's email or mobile. this will also be used for reset password
  async verifyToken(resource: { userId: string, token: number; tokenRoute: 'email' | 'mobile' }) {
    try {
      const { userId, token, tokenRoute } = resource;
      const worker = await User.findOneAndUpdate({ _id: userId, [`${tokenRoute}Token`]: token, [`${tokenRoute}Token`]: null }, {$set: {[tokenRoute]: null}} ).orFail(() => <any>'Token not valid');
      return await getResponse(worker);
    } catch (err: any) {
      throw ({ message: err.message || 'Token not sent', error: err, status: err.status || err.errorStatus || 404 })
    }
  }

  /**
   * @function createProfile
   * @description - This is the second step to signup a user it is also used to update profile.
   * @param {string} firstName - The user's first name.
   * @param {string} lastName - The user's last name.
   * @param {string} email - The user's email.
   * @param {string} mobile - The user's mobile.
   * @param {string} unit - The user's unit.
   * @param {string} password - The user's password.
   * @param {string} invitationID - the user's invitation id.
   * @returns {Promise<any>} - The user id.
   * @memberof workerService
   * @author - A_Omeiza
   * @utility - This is the second step to signup a user.
   * @throws - Error if the user was not found.
   */
  async createProfile(payload:any): Promise<any> {
    try {
      const id = payload.userId
      delete payload.userId;
      // find worker with the given invitationID and update the password, set the passwordResetToken to null and set the passwordResetExpires to null
      const worker = await User.findByIdAndUpdate(id, payload).orFail(new Error('User not found'))
      return await getResponse(worker)
    } catch (err: any) {
      throw ({ message: err.message || 'User not found', error: err, status: err.status || err.errorStatus || 404 })
    }
  }

  /**
   * 
   * @param user - email, mobile or _id of the user
   * @param tokenRoute - where to send the token? either email or mobile
   * @returns Promimisified json
   */
  async sendToken(resource: {user: string, tokenRoute: 'email' | 'mobile' }) {
    try {
      const token = await generateToken();
      const { user, tokenRoute } = resource;
      //find worker by id and update the token
      const worker = await User.findOneAndUpdate({$or:[{invitationID: user}, {mobile: user}, {email: user}]}, { $set: { [tokenRoute]: token } }).orFail(():any =>'User not found');
      // tell typescript to ignore the error
      // the email is in the worker object but typescript is not able to see it
      // because it was appended to the mongoose object by using shema.add()
      // @ts-ignore
      tokenRoute === 'email' ?  await sendMail(worker.email, 'Verification Token', `${token}`) : await sendSms(worker.mobile, token);
      return true;
    } catch (err: any) {
      throw({ message: err.message || 'User not found', error: err, status: err.status || err.errorStatus || 404 })
    }
  }

  async login(resource: { emailOrMobile: string; password: any }) {
    try {
      const { emailOrMobile, password } = resource;
      
      const worker = await User.findOneAndUpdate({
        $or: [
          { email: emailOrMobile },
          { mobile: emailOrMobile },
        ],
      },{$set:{
        logins: {
          $push: {
            date: new Date(),
            ip: '',
          },
        },

      }}).orFail(() => <any>'User not found');
      if (!worker.password) throw {
        success: false,
        message: 'password not correct',
        error: 'User not found',
        status: 404,
        errorStatus: 404,
        data: {},
      }
      const valid = await checkPassword(password, worker.password)
      
      if (worker && valid) {
        return await getResponse(worker, true);
      }
      throw ({ message: 'Username or password incorect', error: 'User not found', status: 404 });
    } catch (err: any) {
      throw ({ message: err.message || 'User not found', error: err, status: err.status || err.errorStatus || 404 })
    }
  }

  // update the user's profile
  async updateProfile( resource: any) {
    try {
      const { userId, ...payload } = resource;
      const updateUser = await User.findByIdAndUpdate(userId, { ...payload }).orFail(() => <any>'User not found');

      return await customResponse(updateUser);
    } catch (err: any) {
      throw ({ message: err.message || 'Profile update failed', error: err, status: err.status || err.errorStatus || 404 })
    }
  }

  /**
   * @description - get worker by userId, mobile or email and return the user's profile
   *    this handles getProfileByEmail, getProfileByMobiel and GetProfileByID calls from the worker controller
   * @param {object} query - this is query object 
   * @example - {userID: 56f4sd564gs4gf4gfg8rg48s}, {mobile: 081548757548}, {email: me@you.we}
   * @returns {Promise<any>} - The user's profile.
   * @memberof workerService
   * @author - A_Omeiza
   * @throws - Error if the user was not found.
   * @utility - get worker by userId, mobile or email and return the user's profile
   * */
  async getProfile(query: object): Promise<any> {
    try {
      const worker = await User.findOne(query).orFail(() => <any>'User not found');

      return await customResponse(worker);
    } catch (err: any) {
      throw ({ message: err.message || 'User not found', error: err, status: err.status || err.errorStatus || 404 })
    }
  }


  //get worker

  async getWorker(userId: string) {
    try {
      return await User.findById(userId).orFail(():any => 'User not found');
    } catch (ex:any) {
      logger.log({
        level: 'error',
        message: ex.message,
      });
      isCastError(ex) ? handleCastErrorExceptionForInvalidObjectId() : throwError(ex);
    }
  }

  async getWorkers(payload = <any>{search_by: '', search_value: '', page: 1, limit: 10, skip: '', user:null}) {
    try {
      // if no by or value is provided, return all converts
      const workers = User.find()
      if (payload.search_by && payload.search_value) {
        workers.where(payload.search_by).equals(payload.search_value)
      }
      if (payload.skip) {
        workers.skip(payload.skip)
      }
      if (payload.page && payload.limit) {
        workers.limit(payload.limit).skip(payload.page * payload.limit)
      }
      // omit the password, _id, _iv, passwordResetToken, passwordResetExpires, and invitationID fields
      workers.select('-password -_id -_iv -passwordResetToken -passwordResetExpires -invitationID -logins')
      const workers_:any = await workers.exec()
      // if there is error, throw it
      if (workers_ instanceof Error) {
        throw workers_
      }
      return await customResponse(workers_)
    } catch (err: any) {
      throw ({ message: err.message || 'Error fetching workers', error: err, status: err.status || err.errorStatus || 404 })
    }
  }


  async forgotPassword(emailorMobile: string) {
    try {
      const token = await generateToken();
      const worker = await User.findOneAndUpdate({ $or: [{ email: emailorMobile }, { mobile: emailorMobile }] }, { passwordResetToken: token }).orFail(() => <any>'User not found');
      // @ts-ignore
      validator.isMobilePhone(emailorMobile, 'en-NG') ? await sendSms(emailorMobile, worker.passwordResetToken) : await sendMail(worker.email, 'Password Reset Token', `${worker.passwordResetToken}`);
      return true;
    } catch (err: any) {
      throw ({ message: err.message || 'User not found', error: err, status: err.status || err.errorStatus || 404 })
    }
  }

  async resetPassword(resource: { password: any; userId:any, token?: any, new_user?: any }) {
    try {
      const { password, token, userId, new_user } = resource;
      const hashedPassword = await hashPassword(password);
      if (new_user) {
        const worker = await User.findOneAndUpdate({ invitationId:userId }, { $set: { password:hashedPassword, passwordResetToken: null, passwordResetExpires: null, invitationId:null } }).orFail(() => <any>'Invitation not found');
        return await getResponse(worker);
      }else {
        const query = <any>{ _id:userId };
        if (token) {
          query['passwordResetToken'] = token;
        }
      const worker = await User.findOneAndUpdate(query, { password: hashedPassword, passwordResetToken: null }).orFail(() => <any>'User not found');

      return await customResponse(worker);
      }
    } catch (err: any) {
      throw ({ message: err.message || 'User not found', error: err, status: err.status || err.errorStatus || 404 })
    }
  }

  async googleDetails(resource: any, action: string) {
    try {
      const details = await googleAuth.googleDetails(resource, action);

      const worker = await User.findOne({ email: details.email });
      // if the lenght of alreadyExist is not 0 email is already in use. throw error
      if (worker && action === 'register') return { error: 'Email already exist' };

      // if this email is not currently in use and he wants to register
      // return the details gotten from google to him.
      if (!worker && action === 'register') return details;

      // if the user wants to login but was not found in the database
      if (worker && action === 'login') return await getResponse(worker);

      // if the user wants to login and was found in the database log him in
      if (!worker && action === 'login') return { error: 'user not found' };
      // if all of this did'nt match the action return details
      return details;
    } catch (err: any) {
      throw ({ message: err.message || 'Url generation failed', error: err, status: err.status || err.errorStatus || 404 })
    }
  }

  // the controller should be able to get this directly
  async getGoogleUrl(action: string): Promise<any> {
    try {
      return await googleAuth.getGoogleUrl(action);
    } catch (err: any) {
      throw ({ message: err.message || 'Could not reach Google', error: err, status: err.status || err.errorStatus || 404 })
    }
  }
};

async function getResponse(user: { toObject: () => any }, isLogin?: boolean) {
  const userObj = user.toObject();
  userObj.userId = userObj._id
  delete userObj.mobileToken;
  delete userObj.emailToken;
  delete userObj.password;
  delete userObj.passwordResetToken;
  delete userObj.passwordResetExpiry;
  delete userObj.__v;
  delete userObj._id

  // if the user is logging in, create a token using tokenizer.generateToken and using user.userId and unit as argument
  if (isLogin) {
    userObj.token = await tokenizer.signToken({ userId: userObj.userId, unit: userObj.unit,admin:userObj.admin });
  }
  return {
    user: userObj,
  };
}

const customResponse = async  (userObj:any)=> {
  delete userObj.password;
  delete userObj.mobileToken;
  delete userObj.emailToken;
  delete userObj.passwordResetToken;
  delete userObj.passwordResetExpiry;
  delete userObj.__v;
  return userObj;
}

async function generateToken() {
  return (Math.floor(Math.random() * 9000) + 1000);
}
export default new workerService();