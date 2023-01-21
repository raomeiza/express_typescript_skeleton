import Joi, { func } from 'joi';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { Request } from 'express';
import isMongoId from 'validator/lib/isMongoId';
import ageGroup from '../../utils/age.group';
// create a regex for password validation - at least one lowercase, one uppercase, one number, minimum 8 characters
export const passwordRegexWithoutSpecialChar = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
export const passwordRegexWithoutSpecialCharError =new Error ('Password must contain at least one lowercase, one uppercase, one number, minimum 8 characters');
export const strongPasswordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
export const stringPassswordError = new Error('Password must contain At least one upper case, one lower case leter, one digit, one special character and a Minimum of 8 length');
// create email regex

export const getPasswordStrenthtLevel = (password: string, lenght: number = 8): number => {
  if (password.length < lenght) { return 0 }
  var level = 0;
  level += password.length > 6 ? 1 : 0;
  level += /[!@#$%^&*?_~]{2,}/.test(password) ? 1 : 0;
  level += /[a-z]{2,}/.test(password) ? 1 : 0;
  level += /[A-Z]{2,}/.test(password) ? 1 : 0;
  level += /[0-9]{2,}/.test(password) ? 1 : 0;
  return level;
}

export const convertMobileToInternational = (mobile: string) => {
  if (mobile && isMobilePhone(mobile, 'en-NG') && mobile.substring(0, 1) === '0') {
    // replace the 0 with the country code
    return mobile.replace(/^0/, '+234');
  }
  return mobile;
}

export const isMobilePhoneValid = (phone: string): true | Error => {
  if (!isMobilePhone(phone, 'en-NG')) {
    throw 'Phone number is not valid';
  }
  return true;
}

export const isEmailValid = (email: string): true | Error => {
  if (!isEmail(email)) {
    throw 'Email is not valid';
  }
  return true;
}

export const isMongoIdValid = (id: string): true | Error => {
  if (!isMongoId(id)) {
    throw 'Id is not valid';
  }
  return true;
}

// create a function to check if emailOrMobile is a valid email or mobile number using validator
export const isEmailOrMobile = (emailOrMobile: string):Boolean => {
  if (isEmail(emailOrMobile)) {
    return true;
  }
  if (isMobilePhone(emailOrMobile, 'en-NG')) {
    return true;
  }
  throw 'Not a valid email or mobile number';
}

// create a function to check if param user is a valid email, mobile number or id else throws an error using validator
export const isEmailOrMobileOrObjectId = (user: string): Boolean => {
  if (isEmail(user)) return true
  if (isMobilePhone(user, 'en-NG')) return true
  if (isMongoId(user)) return true
  throw 'Not a valid email or mobile number or id';
}

// create a function to check if emailOrMobile is a valid email or mobile number using validator
// and returns email if it is a valid email, mobile if it is a valid mobile number else returns false
/**
 * 
 * @param field - the name of the field that user param was picked from
 *  - needed for error reporting
 * @param user - the string to be validated
 * @returns 
 */
export const isThisEmailOrMobile = (field:string, emailOrMobile: string,):'email'|'mobile'| Error => {
  if (isEmail(emailOrMobile)) {
    return 'email';
  }
  if (isMobilePhone(emailOrMobile, 'en-NG')) {
    return 'mobile';
  }
  let error:any = {
    details: {field: field, error: `_${emailOrMobile}_ is neither email, mobile phone nor an object id`},
    Joi:true
  }
  throw error
}

// create a function to check if param user is a valid email or mobile number using validator
export const login = Joi.object().keys({
  emailOrMobile: Joi.string().required().custom(isEmailOrMobile),
  password: Joi.string().required(),
});
// and returns email if it is a valid email, mobile if it is a valid mobile number else returns false
/**
 * 
 * @param field - the name of the field that user param was picked from
 *  - needed for error reporting
 * @param user - the string to be validated
 * @returns 
 */
export const isThisEmailOrMobileOrObjectId = (field:string, user: string,):'email'|'mobile'|'_id' | Error => {
  if (isEmail(user)) return 'email';
  if (isMobilePhone(user, 'en-NG')) return 'mobile';
  // this one will throw an error if other wise
  if (isMongoId(user)) return '_id'
  let error:any = {
    details: {field: field, error: `_${user}_ is neither email, mobile phone nor an object id`},
    Joi:true
  }
  throw error
}

export const preRegister = Joi.object().keys({
  // use the isEmailOrMobile function to check if the emailOrMobile is a valid email or mobile number
  emailOrMobile: Joi.string().required().custom(isEmailOrMobile, 'Invalid email or mobile number'),
  unit: Joi.string().required(),
  invitedBy:Joi.string().required().length(24)
});

export const preRegisterLeader = Joi.object().keys({
  // use the isEmailOrMobile function to check if the emailOrMobile is a valid email or mobile number
  emailOrMobile: Joi.string().required().custom(isEmailOrMobile, 'Invalid email or mobile number'),
  invited_by:Joi.string().required().length(24),
  leader_type: Joi.equal('leader', 'pastor').required(),
  leader_category: Joi.string().when('leaderType', {is: 'leader', then: Joi.required()}),
  leader_level: Joi.string().required().equal('national', 'state', 'regional', 'group_of_districts', 'district'),
  country_leading: Joi.string().required().min(2).max(18),
  state_leading: Joi.string().when('level', {is: 'state', then: Joi.required()}),
  region_leading: Joi.string().when('level', {is: 'regional', then: Joi.required()}),
  group_of_districts_leading: Joi.string().when('level', {is: 'group_of_districts', then: Joi.required()}),
  district_leading: Joi.string().when('level', {is: 'district', then: Joi.required()}),
});

// create a function to check against strongPasswordRegex
export const isStrongPassword = (password: string): Boolean => {
  if (password.match(passwordRegexWithoutSpecialChar)) {
    return true;
  }
  return false;
}

export const createLogin = Joi.object().keys({
  invitationId:Joi.string().length(24).required(),
  token: Joi.number().required(),
  password: Joi.string().regex(passwordRegexWithoutSpecialChar).error(passwordRegexWithoutSpecialCharError).required(),
  repeatPassword: Joi.required().valid(Joi.ref('password')).error(new Error('Passwords do not match')),
});

export const profile = Joi.object().keys({
  firstname: Joi.string().max(50).min(2),
  lastname: Joi.string().max(50).min(2),
  gender: Joi.string().lowercase().equal('male','female'),
  age_group: Joi.string().equal(...ageGroup),
  mobile: Joi.string().custom(isMobilePhoneValid, "Please enter a valid Mobile Phone"),
  mobile_belongs_to: Joi.string().max(12).equal('me','mum', 'dad', 'brother', 'sister', 'uncle', 'aunt', 'friend', 'other'),
  email: Joi.string().lowercase().custom(isEmailValid, "Please enter a valid Email"),
  email_belongs_to: Joi.string().max(12).equal('me','mum', 'dad', 'brother', 'sister', 'uncle', 'aunt', 'friend', 'other'),
  address: Joi.string().max(100).min(2),
  city: Joi.string().max(50).min(2),
  state: Joi.string().max(50).min(2),
  country: Joi.string().max(50).min(2),
  level:  Joi.string().max(12),
  region: Joi.string().max(50).min(2),
  membership: Joi.string().equal('member', 'non-member' ),
  church: Joi.string().max(50).min(2),
  best_language: Joi.string().max(50).min(2),
  other_language: Joi.string().max(50).min(2),
  decision: Joi.string().equal('new', 'restoration', 'unsure'),
  marital_status: Joi.string().equal('married', 'single', 'divorced', 'widowed'),
  children: Joi.string().equal('yes', 'no'),
  education: Joi.string().max(50).min(2),
  occupation: Joi.string().max(50).min(2),
  income: Joi.string().max(50).min(2),
  common_name: Joi.string().max(50).min(2),
  student: Joi.string().equal('yes', 'no'),
  higher_institution: Joi.equal('yes', 'no'),
  school: Joi.string().max(180),
  department: Joi.string().max(100),
  town: Joi.string().max(250),
  on_whatsApp: Joi.bool().equal(true, false,""),
  zip: Joi.string().max(50).min(2),
  registered_by: Joi.string().length(24),
  registered_on: Joi.date(),
  registered_at: Joi.string().max(50).min(2),
});

export const verifyToken = Joi.object().keys({
  mobileToken: Joi.string().required().length(4),
});

export const resetPassword = Joi.object().keys({
  userId: Joi.string().custom(isMongoIdValid).required(),
  token: Joi.string().length(4),
  password: Joi.string().regex(passwordRegexWithoutSpecialChar).error(passwordRegexWithoutSpecialCharError).required(),
});

export const forgotPassword = Joi.object().keys({
  emailorMobile: Joi.string().required().custom(isEmailOrMobile),
});

export const referedByGoogle = async (code:any) => {
  
  if (!code) throw false;
  return true;
};
