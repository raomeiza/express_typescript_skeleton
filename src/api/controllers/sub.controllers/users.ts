import userService from '../../services/user.services'
import auth from '../../middlewares/auth'
import * as validations from '../../validations/common.validations'
import { BodyProp, Security, Route, Res, TsoaResponse, Path, Request, Body, Response, SuccessResponse, Header, Tags, Example, Query, Controller, Get, Post, Put, Delete } from 'tsoa'
import { FRONTEND_URL } from '../../../config'
//import { checkRegisteredNumber, sendTextMessage, clientIsOnline as whatsappClientIsOnline} from '../../../whatsapp/whatsapp'
import crypto from 'crypto'

export default class usersSubController {
  /*
   ***********not implemented yet

  static preRegister = async (token: string, body: {is_leader:'yes'|'no'|boolean, emailOrMobile: string; unit: any }) => {
    try {
      const user = await auth(token, 'jwt')
      //prepare the payload
      await body.is_leader ? validations.preRegisterLeader.validateAsync(body) : validations.preRegister.validateAsync({ invitedBy: user.userId, emailOrMobile: body.emailOrMobile, unit: body.unit })
      let route: 'email' | 'mobile' | Error = validations.isThisEmailOrMobile('emailOrMobile', body.emailOrMobile)
      
      let payload2: any = {
        invitedBy: user.userId,
        unit: body.unit,
        // generate invitationID using crypto.randomBytes
        invitationId: crypto.randomBytes(12).toString('hex')
      }
      route === 'email' ? payload2.email = body.emailOrMobile : payload2.mobile = body.emailOrMobile
      const response: any = await userService.preRegister(payload2);
      const link = `${FRONTEND_URL}/register?invitation_id=${payload2.invitationId}&tokenRoute=${route}`

      let whatsappMessageResponse: any = null
      if (route ==='mobile' && await whatsappClientIsOnline()) {
        const isOnWhatsapp = await checkRegisteredNumber(response.user.mobile.replace('+', ''))
        if (isOnWhatsapp) {
          const message = `*GCK*\r\nHello, you have been invited to join GCK-mx. Click on this link to register: ${link}`
          whatsappMessageResponse =  await sendTextMessage(response.user.mobile.replace('+',''), message)
        }
      }


      // generate the link to be sent to the user
      // if route is mobile and send whatsapp message is not successful, send the link to the user
      route === 'mobile' && !whatsappMessageResponse ?
      await userService.sendSms({ mobile: response.user.mobile, message: link })
      :
      await userService.sendEmail({ emailAddress: payload2.email, subject: 'Your invitation link', message: link })
      // add the link to the response
      response.invitationLink = link
      return response
    } catch (error) {
      throw error;
    }
  }
  */

  static checkInvitation = async (invitationId: string) => {
    try {
      validations.isEmailOrMobileOrObjectId(invitationId)
      await userService.checkInvitation(invitationId)
    } catch (err) {
      throw err
    }
  }

  
}