import { Res, TsoaResponse, Security, Route, Path, Request, Body, Response, SuccessResponse, Header, Tags, Example, Query, Controller, Get, Post, Put, Delete, BodyProp } from 'tsoa'

import { sendError, sendSuccess } from '../../utils/response-handler'
import userService from '../services/user.services'
import * as validations from '../validations/common.validations'
import auth from '../middlewares/auth'

@Route('api/auth/google')
@Tags('Authentication')
export class AuthController extends Controller {

  /**
  * @function - fd
  * @return {Promise<object>} - user profile jsoned object
  * @description - gets the url for google authentication 
  * @param action - either login or registration
  * */
  @SuccessResponse(201, 'link generated successfully')
  @Response('404', 'user not found')
  //  @Response('422', 'validation failed')
  @Response('500', 'internal server error')
  //  @Response('401', 'access denied. You have to be loged')
  @Get('google-url')
  async getGoogleUrl(
    @Res() sendResponse: TsoaResponse<400|500|401, {resp: {status:true | false, message:string, details: any} }>,
    @Query() action: 'login' | 'register'): Promise<any> {
    try {

      if (!action) throw sendError(sendResponse, { statusCode: 400, message: 'action must be provided' })

      const response: any = await userService.getGoogleUrl(action);

      return response.error ? sendError(sendResponse, response.error) : sendSuccess(response)
    } catch (err: any) {
      return sendError(sendResponse, err);
    }
  }

  /**
    * @return {Promise<object>} - user profile jsoned object
    * @description - gets the url for google authentication 
    * @param action - either login or registration link
    * @param code - this is the code sent by google
    * */
  @SuccessResponse(201, 'successfully')
  @Response('404', 'user not found')
  @Response('422', 'validation failed')
  @Response('500', 'internal server error')
  //  @Response('401', 'access denied. You have to be loged')
  @Get('callback')
  async getGoogleDetails(
    @Res() sendResponse: TsoaResponse<400|500|401, {resp: {status:true | false, message:string, details: any} }>,
    @Query() code: string, @Query() action: 'login' | 'register' | string): Promise<any> {
    try {
      await validations.referedByGoogle(code)
      const response: any = await userService.googleDetails(code, action);

      return response.error ? sendError(sendResponse, response.error) : sendSuccess(response)
    } catch (err: any) {
      return sendError(sendResponse, err);
    }
  }

  /**
   * @return {Promise<object>} - user profile jsoned object
   * @description - authenticates a user with token
   * @param Authorization - header authorization token
   * */
  @SuccessResponse(201, 'successfully')
  @Post('validate-token')
  async getGoogleToken(
    @Header() Authorization: string,
    @Res() sendResponse: TsoaResponse<400|500|401, {resp: {status:true | false, message:string, details: any} }>,
    @Request() request: Express.Request
    ): Promise<any> {
    try {
      const user = await auth(request, 'jwtOrSession')
      if (!user) return await sendError(sendResponse, { statusCode: 401, message: 'access denied. You have to be loged' })

      return await sendSuccess(user)
    } catch (err: any) {
      return sendError(sendResponse, err);
    }
  }

}

//export the controller
export default new AuthController();