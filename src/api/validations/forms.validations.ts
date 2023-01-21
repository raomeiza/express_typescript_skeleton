import Joi from "joi";
import validator from "validator";
const isMongoId = (id: string): true | Error => {
  if (!validator.isMongoId(id)) {
    throw new Error("Id is not valid");
  }
  return true;
}

const formValidation = Joi.object().keys({
  accessibleTo: Joi.array().items(
    Joi.object().keys({
      unit: Joi.custom(isMongoId).required(),
      role: Joi.string().valid("admin", "member", "all").required(),
    })
  ),
  auto: Joi.boolean(),
  form: Joi.object().keys({
    title: Joi.string().required().max(50),
    url: Joi.string().required().max(250),
    description: Joi.string().required().max(250),
    createdBy: Joi.custom(isMongoId).required(),
    createdAt: Joi.date().default(Date.now),
    updatedAt: Joi.date().default(Date.now),
    expiresAt: Joi.date(),
    onSubmitSuccess: Joi.object(),
    onSubmitError: Joi.object(),
    inputs: Joi.array().items(
      Joi.object().keys({
        type: Joi.string().valid("text", "textarea", "select", "checkbox", "radio", "date", "time", "datetime", "file").required(),
        name: Joi.string().required().max(50),
        label: Joi.string().required().max(50),
        placeholder: Joi.string().required().max(50),
        required: Joi.boolean().required(),
        options: Joi.array().items(
          Joi.object().keys({
            label: Joi.string().required().max(50),
            value: Joi.string().required().max(50),
          })
        ),
        defaultValue: Joi.string().max(50),
        min: Joi.number(),
        max: Joi.number(),
        step: Joi.number(),
        minDate: Joi.date(),
        maxDate: Joi.date(),
        minTime: Joi.date(),
        maxTime: Joi.date(),
        minDatetime: Joi.date(),
        maxDatetime: Joi.date(),
        multiple: Joi.boolean(),
        accept: Joi.string().max(50),
        pattern: Joi.string().max(50),
        validate: Joi.array().items(
          Joi.object().keys({
            type: Joi.string().valid("required", "min", "max", "minLength", "maxLength", "pattern", "custom","paaswaord", "email", "mobile", "emailOrMobile", "date", "time").required(),
            message: Joi.string().required().max(50),
          })
        ),
      })
    ).required(),
  }).required(),
}).required();

export const validate = (value: string , validations: any) => {
  let errors:any = {};
  validations.forEach((validation: { type: any; name: string | number; message: string; value2: any; minLength: number; maxLength: number; minDAte: any; minDate: string | undefined; maxDate: string | undefined; }) => {
    switch (validation.type) {
      case "email":
        if (!validator.isEmail(value)) {
          errors[validation.name] = validation.message;
        }
        break;
      case "mobile":
        if (!validator.isMobilePhone(value, "en-NG")) {
          errors[validation.name] = validation.message;
        }
        break;
      case "emailOrMobile":
        if (
          !validator.isEmail(value) &&
          !validator.isMobilePhone(value, "en-NG")
        ) {
          errors[validation.name] = validation.message;
        }
        break;
      case "password":
        if (value.length < 8) {
          errors[validation.name] = validation.message;
        }
        break;
      case "passwordMatch":
        if (value !== validation.value2) {
          errors[validation.name] = validation.message;
        }
        break;
      case "minLength":
        if (value.length < validation.minLength) {
          errors[validation.name] = validation.message;
        }
        break;
      case "maxLength":
        if (value.length > validation.maxLength) {
          errors[validation.name] = validation.message;
        }
        break;
      case "match":
        if (value !== validation.value2) {
          errors[validation.name] = validation.message;
        }
        break;
      case "required":
        if (!value) {
          errors[validation.name] =
            validation.message || "This field is required";
        }
        break;
      case "requiredIf":
        if (!value && validation.value2) {
          errors[validation.name] =
            validation.message || "This field is required";
        }
        break;
      case "requiredIfNot":
        if (value && !validation.value2) {
          errors[validation.name] =
            validation.message || "This field is required";
        }
        break;
      case "requiredIfNotEmpty":
        if (value && value.length > 0) {
          errors[validation.name] =
            validation.message || "This field is required";
        }
        break;
      case "date":
        // validate the value using validator.isDate
        if (!validator.isDate(value)) {
          errors[validation.name] = validation.message;
        }
        if (validation.minDAte && !validator.isAfter(value, validation.minDate)) {
          errors[validation.name] =
            validation.message ||
            `Date must be greater than ${validation.minDate}`;
        }
        if (validation.maxDate && !validator.isBefore(value, validation.maxDate)) {
          errors[validation.name] =
            validation.message ||
            `Date must be less than ${validation.maxDate}`;
        }
        break;
      // case "time":
      //   // validate the value using validator.isTime
      //   if (!validator.is(value)) {
      //     errors[validation.name] = validation.message;
      //   }
      //   break;
      default:
        return false;
    }
  });
  return errors;
};

export default formValidation;
