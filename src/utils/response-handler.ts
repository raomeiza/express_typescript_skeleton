const env = process.env.NODE_ENV
// success message formate

const sendSuccess = (data: any, message = 'success', code = 200) => {
  const resp = {
    success: true,
    message,
    data,
  };
  return JSON.stringify(resp);
};

// Error message handler and custom message for special error
const sendError = async (sendResponse: any/* a method for sending the response */, error: any) => {
  let resp: any = {};
  // handle mogoose duplicate key error

  // Handling Mongoose Validation Error
  if (error.error == 'castError') {
    resp.ErrorData = await handleMongooseValidationError(error);
    resp.errorCode = 422
  }
  // handling duplicate key error
  else if (error.error && error.error.code && error.error.code == 11000) {
    resp.ErrorData = await handleDuplicateKeyError(error.error);
    resp.message = resp.ErrorData.error
    resp.errorCode = 409
  }
  // Handling wrong JWT error

  // Handling jwt error
  else if (error.name.toLowerCase() == 'tokenexpirederror') {
    resp.message = 'Token expired, please login again'
    resp.ErrorData = "Session expired, please login again"
    resp.errorCode = 401
  }

  else if (error.name === 'JsonWebTokenError') {
    resp.ErrorData = 'Invalid or expired token. Please login again',
      resp.message = 'Invalid or expired token. Please login again',
      resp.errorCode = 401
  }

  // Handling Expired JWT error
  else if (error.name === 'TokenExpiredError') {
    resp.ErrorData = 'Token expired, please login again',
      resp.message = 'Token expired, please login again',
      resp.errorCode = 401
  }

  // handling api token and key error
  else if (error.name === 'InvalidTokenError') {
    resp.message = 'Invalid token.';
    resp.errorCode = 401
    resp.ErrorData = error.data || ' Invalid token'
  }

  // handling JOI validation error
  else if (error.name === 'ValidationError') {
    resp.message = error.details[0].context.error || 'validation error';
    resp.errorCode = 422
    resp.ErrorData = error.details
  }

  // Handle multer error
  else if (error.name === 'MulterError') {
    delete error.storageErrors
    resp.ErrorData = error;
    resp.message = error.message;
    resp.errorCode = error.errorCode;
    // if its file size error
    if (error.message = 'LIMIT_FILE_SIZE') {
      resp.errorCode = error.code = 413
    }
    if (error.message = 'Unexpected field') {
      resp.errorCode = error.code = 416
    }
  }
  // and finally 
  resp.success = false;
  if (env && env.toLocaleLowerCase() === 'production') {
    resp.errorStack = error.stack || error
  }
  if (resp.message == undefined) resp.message = error.message || 'Internal server error';
  if (resp.ErrorData == undefined) resp.ErrorData = error.details || error;
  if (resp.errorCode == undefined) resp.errorCode = error.status || error.statusCode || error.errorCode || error.statusCode || error.code || 500
  // setStatus(resp.statusCode || 500 )
  return sendResponse(resp.errorCode || 400, resp);
};

const handleDuplicateKeyError = async (err: any) => {
  const field = String(Object.keys(err.keyValue));
  const error = `An account with that ${field} already exists.`;
  return { field: field, error: error };
}

//handle field formatting, empty fields, and mismatched passwords
const handleMongooseValidationError = async (err: any) => {
  try {
    let errors = {};
    err.details.forEach((element: any) => {
      errors = { [element.context.label]: element.message, ...errors };

    });
    return errors
  } catch (ex: any) {
    return err;
  }
}
export { sendError, sendSuccess }