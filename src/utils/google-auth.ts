import { Request } from 'express';
import { google } from 'googleapis';
import { string } from 'joi';
// eslint-disable-next-line max-len
const { GOOGLE_CONFIG_CLIENT_ID, GOOGLE_CONFIG_CLIENT_SECRET, GOOGLE_CONFIG_REDIRECT_URI } = require('../config');

const oauth2 = google.oauth2('v2');

const Oauth2Client = new google.auth.OAuth2(
  GOOGLE_CONFIG_CLIENT_ID,
  GOOGLE_CONFIG_CLIENT_SECRET,
  GOOGLE_CONFIG_REDIRECT_URI, // this must match your google api settings
);
const Oauth2LoginClient = new google.auth.OAuth2(
  GOOGLE_CONFIG_CLIENT_ID,
  GOOGLE_CONFIG_CLIENT_SECRET,
  `${GOOGLE_CONFIG_REDIRECT_URI}?action=login`, // this is where the google will point back to for login
);

const defaultScope = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];
async function getGoogleUrl(action:string):Promise<any> {
  try {
    if (action === 'login') {
      return Oauth2LoginClient.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: 'https://www.googleapis.com/auth/userinfo.email',
      });
    }
    return Oauth2Client.generateAuthUrl({
      access_type: 'offline',
      prompt: 'consent',
      scope: defaultScope,
    });
  } catch (ex:any) {
    return { error: ex };
  }
}

async function googleDetails(code:string, action:string):Promise<{email: string, firstname: string, lastname: string, picture: string} | any> {
  try {
    let tokens;
    if (action && action === 'login') {
      tokens = (await Oauth2LoginClient.getToken(code)).tokens;
    } else {
      tokens = (await Oauth2Client.getToken(code)).tokens;
    }
    Oauth2Client.setCredentials(tokens);
    const userInfo = await oauth2.userinfo.get({ auth: Oauth2Client });
    const info = {
      email: userInfo.data.email,
      firstname: userInfo.data.given_name,
      lastname: userInfo.data.family_name,
      picture: userInfo.data.picture,
    };
    return info;
  } catch (ex:any) {
    return { error: ex };
  }
}

export { getGoogleUrl, googleDetails };
