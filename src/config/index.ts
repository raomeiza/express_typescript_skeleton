require('dotenv').config();
import  path from 'path'
// use the port query to configure the platform dependent env configs
// lastly set the port
  export const PORT = process.env.PORT ? process.env.PORT : 5000
  export const NODE_ENV = process.env.NODE_ENV || 'development'
  export const DATABASE_URL = process.env.PORT ? process.env.DATABASE_URL: 'mongodb://127.0.0.1:27017/dlbc-global-crusade-mx';
  export const BASE_URL = process.env.PORT ? process.env.BASE_URL  : 'http://localhost:5000/';
  export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'iaowuebpiqupiwr8qb4pq39yrvwyveiwqpbrpiqy8y34yq377v5q45yy5'
  export const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
  export const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
  export const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER
  export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY
  export const SENDGRID_EMAIL_FROM = process.env.SENDGRID_EMAIL_FROM
  export const GOOGLE_CONFIG_CLIENT_ID = process.env.GOOGLE_CONFIG_CLIENT_ID
  export const GOOGLE_CONFIG_CLIENT_SECRET = process.env.GOOGLE_CONFIG_CLIENT_SECRET
  export const GOOGLE_CONFIG_REDIRECT_URI = process.env.PORT ? process.env.GOOGLE_CONFIG_REDIRECT_URI : 'http://localhost:5000/auth/google/callback';
  export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
  export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET
  export const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME
  export const CLOUDINARY_URL = process.env.CLOUDINARY_URL
  export const BASE_DIR = path.join(__dirname, '..', '..');
  export const PUBLIC_DIR = path.join(BASE_DIR, 'public')
  export const UPLOAD_DIR = path.join(PUBLIC_DIR, 'static', 'uploads')
  export const FRONTEND_URL = process.env.BASE_URL+'/app'
  export const FRONT_END_PATH = path.join(BASE_DIR, 'public', 'app')
  export const FACEBOOK_PHONE_ID = process.env.FACEBOOK_PHONE_ID
  export const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET
  export const FACEBOOK_TOKEN = process.env.FACEBOOK_TOKEN
  export const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID
  export const WHATSAPP_BOT_USERID = process.env.WHATSAPP_BOT_USERID
  export const TELEGRAM_GCKMX_BOT_TOKEN = process.env.TELEGRAM_GCKMX_BOT_TOKEN
  export const TELEGRAM_AOMEIZA_BOT_TOKEN = process.env.TELEGRAM_AOMEIZA_BOT_TOKEN
  export const WHATSAPP_QUESTIONIA_APP_ID = process.env.WHATSAPP_QUESTIONIA_APP_ID
  export const WHATSAPP_QUESTIONIA_PHONE_ID = process.env.WHATSAPP_QUESTIONIA_PHONE_ID
