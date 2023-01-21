/*
import Client from 'twilio';
import sendGridMail from '@sendgrid/mail';
const logger = require('./logger');
import {throwError} from './handle-error';

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER, SENDGRID_API_KEY, SENDGRID_EMAIL_FROM, BASE_URL } = require('../config');

const accountSid = TWILIO_ACCOUNT_SID;
const authToken = TWILIO_AUTH_TOKEN;
const twilioClient = Client(accountSid, authToken);
sendGridMail.setApiKey(SENDGRID_API_KEY);

// Send SMS using Twilio
const sendSms = async (to:any, body:any) => {
  try {
  twilioClient.messages
    .create({
      body,
      from: TWILIO_PHONE_NUMBER,
      to,
    })
    .then(() => console.log('SMS sent successfully'))
    .catch((err:any) => {
      console.log('SMS sending failed', err);
      logger.log({
      level: 'error',
      message: err.message || err,
    })});
    // .done();
  } catch (err:any) {
    logger.log({
      level: 'error',
      message: err.message,
    });
  }
};
// Send Email using SendGrid
// eslint-disable-next-line consistent-return
const sendMail = async (email:string, subject:string, message:any) => {
  try {
    const data = {
      to: `${email}`,
      from: `GCK <${SENDGRID_EMAIL_FROM}>`,
      subject,
      html: message,
    };
    await sendGridMail.send(data);
  } catch (err:any) {
    console.log('Email sending failed', err);
    logger.log({
      level: 'error',
      message: err.message,
    });
  }
};

//if (String(BASE_URL).includes('.com')) {
  sendSms('+2347044124767', `server restarted at ${new Date().toUTCString()}`);
  sendMail(
    'blesseth.omeiza@gmail.com',
    'GCK-mx server restarted',
    `server restarted at ${new Date().toUTCString()}`
  );
//}

export { sendSms, sendMail };
*/