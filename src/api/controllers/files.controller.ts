import { Post, Request, Route, Res, TsoaResponse, Tags, FormField, UploadedFile, UploadedFiles } from "tsoa";
import express from "express";
import fileHandler from "../middlewares/file-handler";
import { sendError } from "../../utils/response-handler";
const logger = require("../../utils/logger");

@Route("api/files")
@Tags("Files")
export class FilesController {
  @Post("uploadFile")
  public async uploadFile(
    // @UploadedFile() image: Express.Multer.File,
    @Res() sendResponse: TsoaResponse<400 | 500 | 401 | 200, { resp: { success: true | false, message: string, data: any } }>,
    @Request() request: express.Request,
    @UploadedFile() image: Express.Multer.File,
    @FormField() name: string,
    @FormField() description: string,
    @FormField() category: string,
    @FormField() tags: string,
    @FormField() isFeatured: boolean,
    @FormField() isActive: boolean
  ) {
    try {
      await new fileHandler(request, request.res, { fieldName: 'image', maxSize: 5, encType: 'pdf' }).uploadFile(request);
      // if there is no file uploaded, return error
      if (!request.file) {
        return sendError(sendResponse, "No file uploaded");
      }
      return sendResponse(200, { resp: { success: true, message: 'file uploaded successfully', data: { ...request.file } } });
    } catch (err: any) {
      // logger.error(err);
      return sendError(sendResponse, err);
    }
  }
  @Post("upload-video")
  public async uploadVideo(
    // @UploadedFile() video: Express.Multer.File,
    @Res() sendResponse: TsoaResponse<400 | 500 | 401 | 200, { resp: { success: true | false, message: string, data: any } }>,
    @Request() request: express.Request,
    @UploadedFile() video: Express.Multer.File,
    @FormField() name: string,
    @FormField() description: string,
    @FormField() category: string,
    @FormField() tags: string,
    @FormField() isFeatured: boolean,
    @FormField() isActive: boolean
  ) {
    try {
      await new fileHandler(request, request.res, { fieldName: 'video', maxSize: 300, encType: 'video' }).uploadFile(request);
      // if there is no file uploaded, return error
      if (!request.file) {
        return sendError(sendResponse, "No file uploaded");
      }
      return sendResponse(200, { resp: { success: true, message: 'file uploaded successfully', data: { ...request.file } } });
    } catch (err: any) {
      // logger.error(err);
      return sendError(sendResponse, err);
    }
  }
  @Post("upload-any")
  public async uploadAny(
    // @UploadedFiles() image: Express.Multer.File[],
    @Res() sendResponse: TsoaResponse<400 | 500 | 401 | 200, { resp: { success: true | false, message: string, data: any } }>,
    @Request() request: express.Request,
    @UploadedFiles() files: Express.Multer.File[],
    @FormField() name: string,
    @FormField() description: string,
    @FormField() category: string,
    @FormField() tags: string,
    @FormField() isFeatured: boolean,
    @FormField() isActive: boolean
  ) {
    try {
      await new fileHandler(request, request.res, { fieldName: 'image', maxSize: 5, encType: 'any' }).uploadFile(request);
      // if there is no file uploaded, return error
      if (!request.files) {
        return sendError(sendResponse, "No file uploaded");
      }
      return sendResponse(200, { resp: { success: true, message: 'file uploaded successfully', data: { ...request.file } } });
    } catch (err: any) {
      // logger.error(err);
      return sendError(sendResponse, err);
    }
  }

  @Post("upload-any-multiple")
  public async uploadAnyMultiple(
    // @UploadedFiles() image: Express.Multer.File[],
    @Res() sendResponse: TsoaResponse<400 | 500 | 401 | 200, { resp: { success: true | false, message: string, data: any } }>,
    @Request() request: express.Request,
    @UploadedFiles("multiple") files: Express.Multer.File[],
    @FormField() name: string,
    @FormField() description: string,
    @FormField() category: string,
    @FormField() tags: string,
    @FormField() isFeatured: boolean,
    @FormField() isActive: boolean
  ) {
    try {
      await new fileHandler(request, request.res, { fieldName: 'multiple', maxSize: 5, encType: 'any' }).uploadFile(request);
      // if there is no file uploaded, return error
      if (!request.files) {
        return sendError(sendResponse, "No file uploaded");
      }
      return sendResponse(200, { resp: { success: true, message: 'file uploaded successfully', data: { ...request.file } } });
    } catch (err: any) {
      // logger.error(err);
      return sendError(sendResponse, err);
    }
  }
}