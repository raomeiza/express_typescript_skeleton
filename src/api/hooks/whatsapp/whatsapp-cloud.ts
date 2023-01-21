import { Router } from "express";
import { Request, Response } from "express";
import { FACEBOOK_TOKEN, WHATSAPP_QUESTIONIA_APP_ID, WHATSAPP_QUESTIONIA_PHONE_ID } from "../../../config";
const WhatsappCloudApi = require('whatsappcloudapi_wrapper');

const whatsappRouter = Router();
const whatsapp = new WhatsappCloudApi({
    senderPhoneNumberId: WHATSAPP_QUESTIONIA_PHONE_ID,
    accessToken: FACEBOOK_TOKEN,
    WABA_ID: WHATSAPP_QUESTIONIA_APP_ID,
    graphApiVersion: 'v14.0',
});

setTimeout(() => {
    // send a list message
    whatsapp.sendRadioButtons({
      recipientPhone: '2347044124767',
      headerText: 'which will you choose?',
      footerText: 'Please choose one',
      bodyText: 'Please choose one',
      listOfSections: [
        {
          title: 'You like?',
          rows: [
            {
              id: 'yes',
              title: 'yes',
              description: 'I like this'
            },
            {
              id: 'no',
              title: 'yes',
              description: 'I don\'t like this'
            }
          ]
        }
      ]
    }).then((response: any) => {
        console.log('response1', JSON.stringify(response));
    }
    ).catch((error: any) => {
        console.log('error1', JSON.stringify(error));
    });
}, 10000);


/**
 * @function sendText
 * @param {string} recipientPhone
 * @param {string} message
 * @see https://developers.facebook.com/docs/whatsapp/api/messages/text
 * @returns {Promise<any>}
 * @example
 * const response = await sendText('2347044124767', 'Hello World from NodeJS');
 * console.log(response);
 * @example
 * sendText('2347044124767', 'Hello World from NodeJS').then((response) => {
 *     console.log(response);
 * }).catch((error) => {
 *    console.log(error);
 * });
 * @example
 * sendText('2347044124767', 'Hello World from NodeJS').then(console.log).catch(console.log);
 **/
export const sendText = (recipientPhone: string, message: string): Promise<any> => {
    return whatsapp.sendText({
        recipientPhone,
        message,
    });
};

/**
 * @function sendImage
 * @param {string} recipientPhone
 * @param {string} imageUrl
 * @param {string} caption
 * @see https://developers.facebook.com/docs/whatsapp/api/messages/image
 * @returns {Promise<any>}
 * @example
 * const response = await sendImage('2347044124767', 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png', 'Google Logo');
 * console.log(response);
 * @example
 * sendImage('2347044124767', 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png', 'Google Logo').then((response) => {
 *    console.log(response);
 * }).catch((error) => {
 *   console.log(error);
 * });
 * @example
 * sendImage('2347044124767', 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png', 'Google Logo').then(console.log).catch(console.log);
 * @example
 * sendImage('2347044124767', 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png').then(console.log).catch(console.log);
 **/
export const sendImage = (recipientPhone: string, imageUrl: string, caption?: string): Promise<any> => {
    return whatsapp.sendImage({
        recipientPhone,
        imageUrl,
        caption,
    });
};

/**
 * @function sendVideo
 * @param {string} recipientPhone
 * @param {string} videoUrl
 * @param {string} caption
 * @param {string} thumbnailUrl
 * @param {string} title
 * @param {string} description
 * @param {string} duration
 * @param {string} size
 * @param {string} mimeType
 * @param {string} fileName
 * @param {string} fileExtension
 * @param {string} width
 * @param {string} height
 * @see https://developers.facebook.com/docs/whatsapp/api/messages/video
 * @returns {Promise<any>}
 * @example
 * const response = await sendVideo('2347044124767', 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4', 'Sample Video', 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4', 'Sample Video', 'Sample Video', '00:00:10', '1.5MB', 'video/mp4', 'sample-mp4-file', 'mp4', '640', '480');
 * console.log(response);
 * @example
 * sendVideo('2347044124767', 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4', 'Sample Video', 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4', 'Sample Video', 'Sample Video', '00:00:10', '1.5MB', 'video/mp4', 'sample-mp4-file', 'mp4', '640', '480').then((response) => {
 *   console.log(response);
 * }).catch((error) => {
 *  console.log(error);
 * });
 * @example
 * sendVideo('2347044124767', 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4', 'Sample Video', 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4', 'Sample Video', 'Sample Video', '00:00:10', '1.5MB', 'video/mp4', 'sample-mp4-file', 'mp4', '640', '480').then(console.log).catch(console.log);
 **/
export const sendVideo = (recipientPhone: string, videoUrl: string, caption?: string, thumbnailUrl?: string, title?: string, description?: string, duration?: string, size?: string, mimeType?: string, fileName?: string, fileExtension?: string, width?: string, height?: string): Promise<any> => {
  // if there are no required parameters, return an error
  if (!recipientPhone || !videoUrl) {
    return Promise.reject(new Error('recipientPhone and videoUrl are required'));
  }
    return whatsapp.sendVideo({
        recipientPhone,
        videoUrl,
        caption,
        thumbnailUrl,
        title,
        description,
        duration,
        size,
        mimeType,
        fileName,
        fileExtension,
        width,
        height,
    });
};

/**
 * @function sendAudio
 * @param {string} recipientPhone
 * @param {string} audioUrl
 * @param {string} caption
 * @param {string} thumbnailUrl
 * @param {string} title
 * @param {string} description
 * @param {string} duration
 * @param {string} size
 * @param {string} mimeType
 * @param {string} fileName
 * @param {string} fileExtension
 * @see https://developers.facebook.com/docs/whatsapp/api/messages/audio
 * @returns {Promise<any>}
 * @example
 * const response = await sendAudio('2347044124767', 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3', 'Kalimba', 'https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3', 'Kalimba', 'Kalimba', '00:00:10', '1.5MB', 'audio/mp3', 'Kalimba', 'mp3');
 * console.log(response);
 **/
export const sendAudio = (recipientPhone: string, audioUrl: string, caption?: string, thumbnailUrl?: string, title?: string, description?: string, duration?: string, size?: string, mimeType?: string, fileName?: string, fileExtension?: string): Promise<any> => {
  // if there are no required parameters, return an error
  if (!recipientPhone || !audioUrl) {
    return Promise.reject(new Error('recipientPhone and audioUrl are required'));
  }
    return whatsapp.sendAudio({
        recipientPhone,
        audioUrl,
        caption,
        thumbnailUrl,
        title,
        description,
        duration,
        size,
        mimeType,
        fileName,
        fileExtension,
    });
};

/**
 * @function sendDocument
 * @param {string} recipientPhone
 * @param {string} documentUrl
 * @param {string} caption
 * @param {string} thumbnailUrl
 * @param {string} title
 * @param {string} description
 * @param {string} size
 * @param {string} mimeType
 * @param {string} fileName
 * @param {string} fileExtension
 * @see https://developers.facebook.com/docs/whatsapp/api/messages/document
 * @returns {Promise<any>}
 * @example
 * const response = await sendDocument('2347044124767', 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-pdf-file.pdf', 'Sample PDF', 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-pdf-file.pdf', 'Sample PDF', 'Sample PDF', '1.5MB', 'application/pdf', 'sample-pdf-file', 'pdf');
 * console.log(response);
 * @example
 * sendDocument('2347044124767', 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-pdf-file.pdf', 'Sample PDF', 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-pdf-file.pdf', 'Sample PDF', 'Sample PDF', '1.5MB', 'application/pdf', 'sample-pdf-file', 'pdf').then((response) => {
 *  console.log(response);
 * }).catch((error) => {
 * console.log(error);
 * });
 **/
export const sendDocument = (recipientPhone: string, documentUrl: string, caption?: string, thumbnailUrl?: string, title?: string, description?: string, size?: string, mimeType?: string, fileName?: string, fileExtension?: string): Promise<any> => {
  // if there are no required parameters, return an error
  if (!recipientPhone || !documentUrl) {
    return Promise.reject(new Error('recipientPhone and documentUrl are required'));
  }
    return whatsapp.sendDocument({
        recipientPhone,
        documentUrl,
        caption,
        thumbnailUrl,
        title,
        description,
        size,
        mimeType,
        fileName,
        fileExtension,
    });
};

/**
 * @function sendLocation
 * @param {string} recipientPhone
 * @param {string} latitude
 * @param {string} longitude
 * @param {string} name
 * @param {string} address
 * @see https://developers.facebook.com/docs/whatsapp/api/messages/location
 * @returns {Promise<any>}
 * @example
 * const response = await sendLocation('2347044124767', '6.5243793', '3.3792057', 'Lagos', 'Lagos, Nigeria');
 * console.log(response);
 * @example
 * sendLocation('2347044124767', '6.5243793', '3.3792057', 'Lagos', 'Lagos, Nigeria').then((response) => {
 *   console.log(response);
 * }).catch((error) => {
 *   console.log(error);
 * });
 * @example
 * sendLocation('2347044124767', '6.5243793', '3.3792057', 'Lagos', 'Lagos, Nigeria').then((response) => {
 *  console.log(response);
 * }).catch((error) => {
 *  console.log(error);
 * });
 **/
export const sendLocation = (recipientPhone: string, latitude: string, longitude: string, name?: string, address?: string): Promise<any> => {
  // if there are no required parameters, return an error
  if (!recipientPhone || !latitude || !longitude) {
    return Promise.reject(new Error('recipientPhone, latitude and longitude are required'));
  }
    return whatsapp.sendLocation({
        recipientPhone,
        latitude,
        longitude,
        name,
        address,
    });
};


/**
 * @function sendContact
 * @param {string} recipientPhone
 * @param {string} contactPhone
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} vcard
 * @see https://developers.facebook.com/docs/whatsapp/api/messages/contact
 * @returns {Promise<any>}
 * @example
 * const response = await sendContact('2347044124767', '2347044124767', 'John', 'Doe', 'BEGIN:VCARD
 * VERSION:3.0
 * N:Doe;John;;;
 * FN:John Doe
 * TEL;type=CELL;type=VOICE;waid=2347044124767:+234 704 412 4767
 * END:VCARD');
 * console.log(response);
 * @example
 * sendContact('2347044124767', '2347044124767', 'John', 'Doe', 'BEGIN:VCARD
 * VERSION:3.0
 * N:Doe;John;;;
 * FN:John Doe
 * TEL;type=CELL;type=VOICE;waid=2347044124767:+234 704 412 4767
 * END:VCARD').then((response) => {
 * console.log(response);
 * }).catch((error) => {
 * console.log(error);
 * });
 * @example
 * sendContact('2347044124767', '2347044124767', 'John', 'Doe', 'BEGIN:VCARD
 * VERSION:3.0
 * N:Doe;John;;;
 * FN:John Doe
 * TEL;type=CELL;type=VOICE;waid=2347044124767:+234 704 412 4767
 * END:VCARD').then((response) => {
 * }).catch((error) => {
 * console.log(error);
 * });
**/
export const sendContact = (recipientPhone: string, contactPhone: string, firstName: string, lastName: string, vcard: string): Promise<any> => {
  // if there are no required parameters, return an error
  if (!recipientPhone || !contactPhone || !firstName || !lastName || !vcard) {
    return Promise.reject(new Error('recipientPhone, contactPhone, firstName, lastName and vcard are required'));
  }
    return whatsapp.sendContact({
        recipientPhone,
        contactPhone,
        firstName,
        lastName,
        vcard,
    });
};

/**
 * @function sendTemplate
 * @param {string} recipientPhone
 * @param {string} namespace
 * @param {string} elementName
 * @param {string} languageCode
 * @param {string} params
 * @see https://developers.facebook.com/docs/whatsapp/api/messages/template
 * @returns {Promise<any>}
 * @example
 * const response = await sendTemplate('2347044124767', 'sample-namespace', 'sample-element-name', 'en', '{
 *   "first_name": "John",
 *  "last_name": "Doe",
 * "phone_number": "+2347044124767"
 * }');
 * console.log(response);
 * @example
 * sendTemplate('2347044124767', 'sample-namespace', 'sample-element-name', 'en', '{
 *  "first_name": "John",
 *  "last_name": "Doe",
 *  "phone_number": "+2347044124767"
 * }').then((response) => {
 * console.log(response);
 * }).catch((error) => {
 * console.log(error);
 * });
 **/
export const sendTemplate = (recipientPhone: string, namespace: string, elementName: string, languageCode: string, params: string): Promise<any> => {
  // if there are no required parameters, return an error
  if (!recipientPhone || !namespace || !elementName || !languageCode || !params) {
    return Promise.reject(new Error('recipientPhone, namespace, elementName, languageCode and params are required'));
  }
    return whatsapp.sendTemplate({
        recipientPhone,
        namespace,
        elementName,
        languageCode,
        params,
    });
};

/**
 * @function sendTemplateButton
 * @param {string} recipientPhone
 * @param {string} namespace
 * @param {string} elementName
 * @param {string} languageCode
 * @param {string} params
 * @param {string} buttonId
 * @see https://developers.facebook.com/docs/whatsapp/api/messages/template
 * @returns {Promise<any>}
 * @example
 * const response = await sendTemplateButton('2347044124767', 'sample-namespace', 'sample-element-name', 'en', '{
 *  "first_name": "John",
 *  "last_name": "Doe",
 *  "phone_number": "+2347044124767"
 * }', 'sample-button-id');
 * console.log(response);
 * @example
 * sendTemplateButton('2347044124767', 'sample-namespace', 'sample-element-name', 'en', '{
 * "first_name": "John",
 * "last_name": "Doe",
 * "phone_number": "+2347044124767"
 * }', 'sample-button-id').then((response) => {
 * console.log(response);
 * }).catch((error) => {
 * console.log(error);
 * });
 **/
export const sendTemplateButton = (recipientPhone: string, namespace: string, elementName: string, languageCode: string, params: string, buttonId: string): Promise<any> => {
  // if there are no required parameters, return an error
  if (!recipientPhone || !namespace || !elementName || !languageCode || !params || !buttonId) {
    return Promise.reject(new Error('recipientPhone, namespace, elementName, languageCode, params and buttonId are required'));
  }
    return whatsapp.sendTemplateButton({
        recipientPhone,
        namespace,
        elementName,
        languageCode,
        params,
        buttonId,
    });
};


/**
 * @function sendList
 * @param {string} recipientPhone
 * @param {string} namespace
 * @param {string} elementName
 * @param {string} languageCode
 * @param {string} params
 * @see https://developers.facebook.com/docs/whatsapp/api/messages/template
 * @returns {Promise<any>}
 * @example
 * const response = await sendList('2347044124767', 'sample-namespace', 'sample-element-name', 'en', '{
 * "first_name": "John",
 * "last_name": "Doe",
 * "phone_number": "+2347044124767"
 * }');
 * console.log(response);
 * @example
 * sendList('2347044124767', 'sample-namespace', 'sample-element-name', 'en', '{  
 * "first_name": "John",
 * "last_name": "Doe",
 * "phone_number": "+2347044124767"
 * }').then((response) => {
 * console.log(response);
 * }).catch((error) => {
 * console.log(error);
 * });
 **/
export const sendList = (recipientPhone: string, namespace: string, elementName: string, languageCode: string, params: string): Promise<any> => {
  // if there are no required parameters, return an error
  if (!recipientPhone || !namespace || !elementName || !languageCode || !params) {
    return Promise.reject(new Error('recipientPhone, namespace, elementName, languageCode and params are required'));

  }
    return whatsapp.sendList({
        recipientPhone,
        namespace,
        elementName,
        languageCode,
        params,
    });
};

// /**
//  * @functio handleWebhook
//  * @param {string} body
//  * @param {string} signature
//  * @returns {Promise<any>}
//  * @example
//  * const response = await handleWebhook('sample-body', 'sample-signature');
//  * console.log(response);
//  * @example
//  * handleWebhook('sample-body', 'sample-signature').then((response) => {
//  * console.log(response);
//  * }).catch((error) => {
//  * console.log(error);
//  * });
//  * @see https://developers.facebook.com/docs/whatsapp/api/messages/inbound-receive
//  * @see https://developers.facebook.com/docs/whatsapp/api/messages/outbound-receive
//  * @see https://developers.facebook.com/docs/whatsapp/api/messages/outbound-status
//  * @see https://developers.facebook.com/docs/whatsapp/api/messages/inbound-status
//  * @see https://developers.facebook.com/docs/whatsapp/api/messages/inbound-media
//  * @see https://developers.facebook.com/docs/whatsapp/api/messages/outbound-media
//  * @see https://developers.facebook.com/docs/whatsapp/api/messages/inbound-media-status
//  * @see https://developers.facebook.com/docs/whatsapp/api/messages/outbound-media-status
//  * @see https://developers.facebook.com/docs/whatsapp/api/messages/inbound-media-download
//  * @see https://developers.facebook.com/docs/whatsapp/api/messages/outbound-media-download
//  * @see https://developers.facebook.com/docs/whatsapp/api/messages/inbound-media-download-status
//  * @see https://developers.facebook.com/docs/whatsapp/api/messages/outbound-media-download-status
//  * @see https://developers.facebook.com/docs/whatsapp/api/messages/inbound-media-upload
//  * @see https://developers.facebook.com/docs/whatsapp/api/messages/outbound-media-upload
//  * @see https://developers.facebook.com/docs/whatsapp/api/messages/inbound-media-upload-status
//  * @see https://developers.facebook.com/docs/whatsapp/api/messages/outbound-media-upload-status
//  * @see https://developers.facebook.com/docs/whatsapp/api/messages/inbound-media-upload-download
//  * @see https://developers.facebook.com/docs/whatsapp/api/messages/outbound-media-upload-download
//  * @see https://developers.facebook.com/docs/whatsapp/api/messages/inbound-media-upload-download-status
//  * @see https://developers.facebook.com/docs/whatsapp/api/messages/outbound-media-upload-download-status
//  * @see https://developers.facebook.com/docs/whatsapp/api/messages/inbound-media-upload-download
//  * @see https://developers.facebook.com/docs/whatsapp/api/messages/outbound-media-upload-download
//  * @see https://developers.facebook.com/docs/whatsapp/api/messages/inbound-media-upload-download-status
//  * @see https://developers.facebook.com/docs/whatsapp/api/messages/outbound-media-upload-download-status
//  * @see https://developers.facebook.com/docs/whatsapp/api/messages/inbound-media-upload-download
//  * @see https://developers.facebook.com/docs/whatsapp/api/messages/outbound-media-upload-download
//  **/
// export const handleWebhook = (body: string, signature: string): Promise<any> => {
//   // if there are no required parameters, return an error
//   if (!body || !signature) {
//     return Promise.reject(new Error('body and signature are required'));
//   }
  
//   // get the webhook event
//   const event = getWebhookEvent(body, signature);
// };



/**
 * @function getWebhookEvent
 * @param {string} body
 * @param {string} signature
 * @returns {Promise<any>}
 * @example
 * const response = await getWebhookEvent('sample-body', 'sample-signature');
 * console.log(response);
 * @example
 * getWebhookEvent('sample-body', 'sample-signature').then((response) => {
 * console.log(response);
 * }).catch((error) => {
 * console.log(error);
 * });
 * @see https://developers.facebook.com/docs/whatsapp/api/messages/inbound-receive
 * @see https://developers.facebook.com/docs/whatsapp/api/messages/outbound-receive
 **/

whatsappRouter.all("/hooks/waba", (req: Request, res: Response) => {
  let data = whatsapp.parseMessage(req.body);
  console.log(data);
  res.status(200).send("OK");
  if (data) {
    let { message, sender } = data;
    if (message) {
      let { text } = message;
      if (text) {
        if (text.toLowerCase() === "hello") {
          whatsapp.sendTextMessage({
            to: sender,
            text: "Hello World",
            type: "text",
            messaging_product: "whatsapp",
            recipient_type: "individual",
          });
        }
      }
    }
  }
});

export default whatsappRouter;