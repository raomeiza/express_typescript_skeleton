import express from 'express';

 const fileFilter = (req:express.Request, file:any, encType:string, callback:any):any=> {
  // check if the file type is allowed by comparing the file
  // type with the this.encType
  let acceptable = false;
  const fileType = file.mimetype.split('/')[1];
  // if this.encType equals video, then we need to check if the file is a video
  if (encType === 'video') {
    if (fileType === 'mp4' || fileType === 'avi' || fileType === 'mov') {
      acceptable = true
    }
    // else check if this.encType equals image and if the file is an image
  } else if (encType === 'image') {
    if (fileType === 'jpeg' || fileType === 'png' || fileType === 'jpg' || fileType === 'gif' || fileType === 'bmp') {
      acceptable = true
    }
    // else check if this.encType equals pdf and if the file is a pdf
  } else if (encType === 'pdf') {
    if (fileType === 'pdf') {
      acceptable = true
    }
  }
  // else check if this.encType equals audio and if the file is an audio
  else if (encType === 'audio') {
    if (fileType === 'mp3' || fileType === 'wav' || fileType === 'ogg' || fileType === 'aac') {
      acceptable = true
    }
  }
  // else check if this.encType equals text and if the file is a text
  else if (encType === 'text') {
    if (fileType === 'txt') {
      acceptable = true
    }
  }
  // else check if this.encType equals document and if the file is a document
  else if (encType === 'document') {
    if (fileType === 'doc' || fileType === 'docx' || fileType === 'xls' || fileType === 'xlsx' || fileType === 'ppt' || fileType === 'pptx') {
      acceptable = true
    }
  }
  // else check if this.encType equals zip and if the file is a zip
  else if (encType === 'zip') {
    if (fileType === 'zip') {
      acceptable = true
    }
  }
  // else check if this.encType equals any and if the file is any
  else if (encType === 'any') {
    acceptable = true
  }
  // finally, check if enctype is exactly the same as the file type
  else if (encType === fileType) {
    acceptable = true
  }
  
  // if the file is not acceptable, then return an error
  if (!acceptable) {
    return callback ({
      errorCode: 415,
      message: 'file type not surported',
      name: 'MulterError',
      field:file.fieldname,
      stack: 'invalid file upload'
    })
  }else {
    return callback(null, true);
  }
}
export default fileFilter;