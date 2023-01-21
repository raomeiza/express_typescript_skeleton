import { sendError, sendSuccess } from '../../utils/response-handler'
import userService from '../services/user.services'
import auth from '../middlewares/auth'
import * as validations from '../validations/common.validations'
import { BodyProp, Security, Route, Res, TsoaResponse, Path, Request, Body, Response, SuccessResponse, Header, Tags, Example, Query, Controller, Get, Post, Put, Delete } from 'tsoa'
import { FRONTEND_URL } from '../../config'
import usersSubController from './sub.controllers/users'

@Route('api/user')
@Tags('user')
export class userController extends Controller {
  /**
   * @function - pre-register a user
   * @implements - userService.getProfile
   * @param emailOrMobile - email or mobile number of the user to be pre-registered
   * @return {Promise<object>} - user profile jsoned object
   * 
  @Example({ emailOrMobile: '09053634327' })
  @Post('pre-register')
  @Example(
    {
      emailOrMobile: 'blesseth.omeiza@gmail.com',
      unit: 'usher'
    }
  )


  @Response(201, 'user pre-registered successfully')
  public async preRegisteruser(
    @Res() sendResponse: TsoaResponse<400 | 500 | 401, { resp: { success: true | false, message: string, data: any } }>,
    @Request() request: any,
    @Header() Authorization: string,
    // @Body() data: {emailOrMobile:string, unit:string}
  ): Promise<any> {
    try {
      const payload = request.body
      if (request.query.is_leader) payload.is_leader = request.query.is_leader;
      const token = request.headers.authorization || request.headers.Authorization || payload.token
      const response = await usersSubController.preRegister(token, payload);
      return response.error ? await sendError(sendResponse, response.error) :
        sendSuccess(response)
    } catch (err: any) {
      return await sendError(sendResponse, err);
    }
  }


  not implemented yer  */ 

  /**
   * @description - check if the invitationID is valid implementing userService.checkInvitation
   * @param user - either email or mobile used go invite the user
   * */
  @Example(
    { emailOrMobile: '02157896548' }
  )
  @Get('check-invitation')
  @Response(200, 'invitation is valid')
  async checkInvitation(
    @Res() sendResponse: TsoaResponse<200 | 400 | 500 | 413, { resp: { success: true | false, message: string, data: any } }>,
    @Request() request: any,
  ): Promise<any> {
    try {
      const invitationId = request.query.invitation_id
      const response: any = await usersSubController.checkInvitation(invitationId)

      return response.error ? await sendError(sendResponse, response.error) :
        sendSuccess(response, 'valid invitation');

    } catch (err: any) {
      return await sendError(sendResponse, err);
    }
  }

  /**
   * @description - first step to validating a pre registered account
   * */
  @Example({
    password: '123456qwerty',
    repeat_passwork: '123456qwerty',
    token: 85795,
    tokenRoute: 'email'
  })
  @Post('register')
  @Response(201, 'Registered successfully')
  public async createLogin(
    @Res() sendResponse: TsoaResponse<400 | 500 | 401 | 201 | 200, { resp: { success: true | false, message: string, data: any } }>,
    @Request() request: any,
    // @Body() payload: {
    //   password:string,
    //   repeatPassword:string,
    //   token:number
    // }
  ): Promise<any> {
    try {
      const payload = request.body
      // fetch invitationId and tokenRoute from the request
      const invitationId = request.query.invitation_id
      const tokenRoute = request.query.token_route
      await validations.createLogin.validateAsync({
        invitationId: invitationId,
        password: payload.password,
        repeatPassword: payload.repeatPassword,
        token: payload.token,
      })
      // hash the payload.password
      const response: any = await userService.createLogin({ invitationId: invitationId, ...payload, tokenRoute: tokenRoute });

      return response.error ? await sendError(sendResponse, response.error) :
        sendSuccess(response)
    } catch (err: any) {
      return await sendError(sendResponse, err);
    }
  }

  /**
   * @description - verify the user using the token
   * @param token - token to be verified
   * #@return {Promise<object>} - user profile jsoned object
   */
  @SuccessResponse(201, 'Account verified')
  @Example({
    token: 54875,
    tokenRoute: 'email'
  })

  @Post('verify-token')
  @Response(200, 'Account verified')
  async verifyAccount(
    @Res() sendResponse: TsoaResponse<400 | 500 | 401, { resp: { success: true | false, message: string, data: any } }>,
    @Request() request: any,
    // @Body() payload:{
    //   token:number,
    //   tokenRoute:'email' | 'mobile'
    // }
  ): Promise<any> {
    try {
      const payload = request.body
      const invitationId = request.query.invitation_id
      await validations.verifyToken.validateAsync(payload);

      const response: any = await userService.verifyToken({ invitationId, ...payload });

      return response.error ? await sendError(sendResponse, response.error) :
        sendSuccess(response)
    } catch (err: any) {
      return await sendError(sendResponse, err);
    }
  };

  /**
   * @description - used to send new token to the user 
   * @param emailOrMobile - the user's email or mobile phone number in international format
   **/
  @SuccessResponse(201, 'Token sent')
  @Post('send-token')
  //example 1
  @Example({
    user: '+2347044124767',
    tokenRoute: 'mobile',
  })
  //example 2
  @Example(
    {
      user: 'blesseth.omeiza@gmail.com',
      tokenRoute: 'email'
    }
  )
  async sendToken(
    @Res() sendResponse: TsoaResponse<400 | 500 | 401, { resp: { success: true | false, message: string, data: any } }>,
    // @Body() payload:{
    //   user:string,
    //   tokenRoute: 'email' | 'mobile' }
    @Request() request: any,
  ): Promise<any> {
    try {
      const payload = request.body
      // check if the route chosen is either email or mobile
      await validations.isThisEmailOrMobile('user', payload.user);

      const response: any = await userService.sendToken(payload);

      return response.error ? await sendError(sendResponse, response.error) :
        sendSuccess(response)
    } catch (err: any) {
      return await sendError(sendResponse, err);
    }
  };

  /**
   * @description - used to send new token to the user 
   * @param emailOrMobile - the user's email or mobile phone number in international format
   **/
  @SuccessResponse(200, 'Login successfull')
  @Example({
    emailOrMobile: 'blesseth.omeiza@gmail.com',
    password: '123456qwerty',
  })
  @Post('login')
  async login(
    @Res() sendResponse: TsoaResponse<400 | 500 | 401 | 404, { resp: { success: false, message: string, data: any } }>,
    // @Body() payload: {
    //   emailOrMobile: string,
    //   password: string,}
    @Request() request: any,
  ): Promise<any> {
    try {
      const payload = request.body
      await validations.login.validateAsync(payload);


      const response: any = await userService.login(payload);
      return response.error ? await sendError(sendResponse, response.error) :
        sendSuccess(response)
    } catch (err: any) {
      return await sendError(sendResponse, err);
    }
  };

  /**
   * @description - the user registers his profile details
   * @param firstname - YOur name
   * @param lastname - Your father's name
   * @param gender - the user's email or mobile phone number in international format
   * @param gender - the user's email or mobile phone number in international format
   * @param gender - the user's email or mobile phone number in international format
   **/
  @Example({
    firstname: 'Abraham',
    lastname: 'abdulraheem',
    gender: 'male',
    ageGroup: '10-15'
  })
  @SuccessResponse(201, 'Profile updated successfully')
  @Post('create-profile')
  async createProfile(
    @Res() sendResponse: TsoaResponse<400 | 500 | 401, { resp: { success: true | false, message: string, data: any } }>,
    @Request() request: any,
    // @Header() authorization:string,
    // @Body() payload: {
    //   firstname: string,
    //   lastname: string,
    //   gender: 'male' | 'female',
    //   ageGroup: '10-15' | '16-20' | '26-30' | '36-40' | '40-65' | '66 -above'
    // }
  ): Promise<any> {
    try {
      const payload = request.body
      const Authorization = request.headers.Authorization
      let validUser: any = await auth(request, 'jwtOrSessiion')
      await validations.profile.validateAsync(payload);

      const response: any = await userService.createProfile({ userId: validUser.userId, ...payload });

      return response.error ? await sendError(sendResponse, response.error) :
        sendSuccess(response)
    } catch (err: any) {
      return await sendError(sendResponse, err);
    }
  };

  /**
   * @description - the user registers his profile details
   **/
  @Example({
    firstname: 'Abraham',
    lastname: 'abdulraheem',
    gender: 'male'
  })
  @Post('update-profile')
  @SuccessResponse(201, 'Profile updated successfully')
  async updateProfile(
    @Res() sendResponse: TsoaResponse<400 | 500 | 401 | 201 | 200, { resp: { success: true | false, message: string, data: any } }>,
    // @Body() payload:any
    @Request() request: any,
  ): Promise<any> {
    try {
      const payload = request.body
      await validations.profile.validateAsync(payload);
      const user = await auth(request, 'jwtOrSession')
      payload.userId = user.userId;
      const response: any = await userService.updateProfile(payload);

      return response.error ? await sendError(sendResponse, response.error) :
        sendSuccess(response)
    } catch (err: any) {
      return await sendError(sendResponse, err);
    }
  };

  /**
    * @function - get user profile using thier mobile number
    * @implements - userService.getProfile
    * @return {Promise<object>} - user profile jsoned object
    * */
  @Example({ user: 'blesseth.omeiza@gmail.com' })
  @Get('profile')
  @SuccessResponse(201, 'Profile updated successfully')
  async getProfile(
    @Res() sendResponse: TsoaResponse<400 | 500 | 401 | 404, { resp: { success: true | false, message: string, data: any } }>,
    @Query() user: string
  ): Promise<any> {
    try {
      const queryRoute = await validations.isThisEmailOrMobileOrObjectId('query.user', user)

      if (queryRoute == ('email' || 'mobile' || '_id')) {
        const response: any = await userService.getProfile({ [queryRoute]: user });
        return response.error ? await sendError(sendResponse, response.error) :
          sendSuccess(response)
      } else {
        throw {
          message: 'Invalid query',
          status: 400,
          success: false,
          error: {
            message: 'Invalid query',
            status: 400,
            success: false,
          }
        }
      }

    } catch (err: any) {
      return await sendError(sendResponse, err);
    }
  }

  @Get('get-users')
  @SuccessResponse(200, 'users gotten successfully')
  public async fetchConverts(
    @Res() sendResponse: TsoaResponse<400 | 500 | 401 | 409, { resp: { success: true | false, message: string, data: any } }>,
    @Request() request: any,
    @Header() Authorization: string,
    @Query() search_by?: string,
    @Query() search_value?: string,
    @Query() page?: number,
    @Query() limit?: number,
    @Query() skip?: string,

  ): Promise<any> {
    try {
      const payload = request.query
      const user = await auth(request, 'jwtOrSession')
      payload.user = user
      //find the converts
      const response: any = await userService.getWorkers(payload)
      return response.error ? await sendError(sendResponse, response.error) :
        sendSuccess(response)
    } catch (err: any) {
      return await sendError(sendResponse, err);
    }
  }


  /**
    * @function - get user profile using thier mobile number
    * @implements - userService.getProfile
    * @return {Promise<object>} - user profile jsoned object
    * */
  @SuccessResponse(201, 'Profile updated successfully')
  @Example({ emailOrMobile: 'blesseth.omeiza@gmail.com' })
  @Post('forgot-password')
  async forgotPassword(
    @Res() sendResponse: TsoaResponse<400 | 500 | 401 | 404, { resp: { success: true | false, message: string, data: any } }>,
    @BodyProp() emailOrMobile: any) {
    try {
      await validations.isThisEmailOrMobile('emailOrMobile', emailOrMobile)

      const response: any = await userService.getProfile(emailOrMobile);

      return response.error ? await sendError(sendResponse, response.error) : sendSuccess(response)
    } catch (err: any) {
      return await sendError(sendResponse, err);
    }
  }

  /**
    * @function - fd
    * @implements - userService.getProfile
    * @return {Promise<object>} - user profile jsoned object
    * */
  @Example(
    {
      userId: "urw9rtu9w8947598759435",
      password: '123654qwerty',
      repeat_password: '123456qwerty',
      token: 15789
    })
  @Post('reset-password')
  @SuccessResponse(201, 'Password changed successfully')
  async resetPassword(
    @Res() sendResponse: TsoaResponse<400 | 500 | 401, { resp: { success: true | false, message: string, data: any } }>,
    // @Body() payload:any
    @Request() request: any,
  ) {
    try {
      const payload = request.body
      payload.userId = request.query.invitation_id || request.body.userId || request.query.userId
      payload.new_user = request.query.new_user || request.body.new_user || request.query.new_user
      if (payload.password !== payload.confirmPassword) throw { message: "passwords do not match", errorCode: 401 }
      if (!payload.userId || !payload.new_user) {
        const user = await auth(request, 'jwtOrSession')
        if(user) payload.userId = user.userId
      }
      await validations.resetPassword.validateAsync({ token: payload.token, password: payload.password, userId: payload.userId })

      const response: any = await userService.resetPassword(payload);

      return response.error ? await sendError(sendResponse, response.error) : sendSuccess(response)
    } catch (err: any) {
      return await sendError(sendResponse, err);
    }
  }
}

//export the controller
export default new userController();