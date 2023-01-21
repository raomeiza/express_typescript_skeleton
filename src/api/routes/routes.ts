/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthController } from './../controllers/auth.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { FilesController } from './../controllers/files.controller';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { userController } from './../controllers/users.controller';
import type { RequestHandler } from 'express';
import * as express from 'express';
const multer = require('multer');
const upload = multer();

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/api/auth/google/google-url',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.getGoogleUrl)),

            function AuthController_getGoogleUrl(request: any, response: any, next: any) {
            const args = {
                    sendResponse: {"in":"res","name":"401","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"resp":{"dataType":"nestedObjectLiteral","nestedProperties":{"details":{"dataType":"any","required":true},"message":{"dataType":"string","required":true},"status":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":[true]},{"dataType":"enum","enums":[false]}],"required":true}},"required":true}}},
                    action: {"in":"query","name":"action","required":true,"dataType":"union","subSchemas":[{"dataType":"enum","enums":["login"]},{"dataType":"enum","enums":["register"]}]},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthController();


              const promise = controller.getGoogleUrl.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/auth/google/callback',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.getGoogleDetails)),

            function AuthController_getGoogleDetails(request: any, response: any, next: any) {
            const args = {
                    sendResponse: {"in":"res","name":"401","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"resp":{"dataType":"nestedObjectLiteral","nestedProperties":{"details":{"dataType":"any","required":true},"message":{"dataType":"string","required":true},"status":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":[true]},{"dataType":"enum","enums":[false]}],"required":true}},"required":true}}},
                    code: {"in":"query","name":"code","required":true,"dataType":"string"},
                    action: {"in":"query","name":"action","required":true,"dataType":"union","subSchemas":[{"dataType":"enum","enums":["login"]},{"dataType":"enum","enums":["register"]},{"dataType":"string"}]},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthController();


              const promise = controller.getGoogleDetails.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/auth/google/validate-token',
            ...(fetchMiddlewares<RequestHandler>(AuthController)),
            ...(fetchMiddlewares<RequestHandler>(AuthController.prototype.getGoogleToken)),

            function AuthController_getGoogleToken(request: any, response: any, next: any) {
            const args = {
                    Authorization: {"in":"header","name":"Authorization","required":true,"dataType":"string"},
                    sendResponse: {"in":"res","name":"401","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"resp":{"dataType":"nestedObjectLiteral","nestedProperties":{"details":{"dataType":"any","required":true},"message":{"dataType":"string","required":true},"status":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":[true]},{"dataType":"enum","enums":[false]}],"required":true}},"required":true}}},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new AuthController();


              const promise = controller.getGoogleToken.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/files/uploadFile',
            upload.single('image'),
            ...(fetchMiddlewares<RequestHandler>(FilesController)),
            ...(fetchMiddlewares<RequestHandler>(FilesController.prototype.uploadFile)),

            function FilesController_uploadFile(request: any, response: any, next: any) {
            const args = {
                    sendResponse: {"in":"res","name":"200","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"resp":{"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true},"success":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":[true]},{"dataType":"enum","enums":[false]}],"required":true}},"required":true}}},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    image: {"in":"formData","name":"image","required":true,"dataType":"file"},
                    name: {"in":"formData","name":"name","required":true,"dataType":"string"},
                    description: {"in":"formData","name":"description","required":true,"dataType":"string"},
                    category: {"in":"formData","name":"category","required":true,"dataType":"string"},
                    tags: {"in":"formData","name":"tags","required":true,"dataType":"string"},
                    isFeatured: {"in":"formData","name":"isFeatured","required":true,"dataType":"string"},
                    isActive: {"in":"formData","name":"isActive","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new FilesController();


              const promise = controller.uploadFile.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/files/upload-video',
            upload.single('video'),
            ...(fetchMiddlewares<RequestHandler>(FilesController)),
            ...(fetchMiddlewares<RequestHandler>(FilesController.prototype.uploadVideo)),

            function FilesController_uploadVideo(request: any, response: any, next: any) {
            const args = {
                    sendResponse: {"in":"res","name":"200","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"resp":{"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true},"success":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":[true]},{"dataType":"enum","enums":[false]}],"required":true}},"required":true}}},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    video: {"in":"formData","name":"video","required":true,"dataType":"file"},
                    name: {"in":"formData","name":"name","required":true,"dataType":"string"},
                    description: {"in":"formData","name":"description","required":true,"dataType":"string"},
                    category: {"in":"formData","name":"category","required":true,"dataType":"string"},
                    tags: {"in":"formData","name":"tags","required":true,"dataType":"string"},
                    isFeatured: {"in":"formData","name":"isFeatured","required":true,"dataType":"string"},
                    isActive: {"in":"formData","name":"isActive","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new FilesController();


              const promise = controller.uploadVideo.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/files/upload-any',
            upload.array('files'),
            ...(fetchMiddlewares<RequestHandler>(FilesController)),
            ...(fetchMiddlewares<RequestHandler>(FilesController.prototype.uploadAny)),

            function FilesController_uploadAny(request: any, response: any, next: any) {
            const args = {
                    sendResponse: {"in":"res","name":"200","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"resp":{"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true},"success":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":[true]},{"dataType":"enum","enums":[false]}],"required":true}},"required":true}}},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    files: {"in":"formData","name":"files","required":true,"dataType":"array","array":{"dataType":"file"}},
                    name: {"in":"formData","name":"name","required":true,"dataType":"string"},
                    description: {"in":"formData","name":"description","required":true,"dataType":"string"},
                    category: {"in":"formData","name":"category","required":true,"dataType":"string"},
                    tags: {"in":"formData","name":"tags","required":true,"dataType":"string"},
                    isFeatured: {"in":"formData","name":"isFeatured","required":true,"dataType":"string"},
                    isActive: {"in":"formData","name":"isActive","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new FilesController();


              const promise = controller.uploadAny.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/files/upload-any-multiple',
            upload.array('multiple'),
            ...(fetchMiddlewares<RequestHandler>(FilesController)),
            ...(fetchMiddlewares<RequestHandler>(FilesController.prototype.uploadAnyMultiple)),

            function FilesController_uploadAnyMultiple(request: any, response: any, next: any) {
            const args = {
                    sendResponse: {"in":"res","name":"200","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"resp":{"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true},"success":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":[true]},{"dataType":"enum","enums":[false]}],"required":true}},"required":true}}},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    files: {"in":"formData","name":"multiple","required":true,"dataType":"array","array":{"dataType":"file"}},
                    name: {"in":"formData","name":"name","required":true,"dataType":"string"},
                    description: {"in":"formData","name":"description","required":true,"dataType":"string"},
                    category: {"in":"formData","name":"category","required":true,"dataType":"string"},
                    tags: {"in":"formData","name":"tags","required":true,"dataType":"string"},
                    isFeatured: {"in":"formData","name":"isFeatured","required":true,"dataType":"string"},
                    isActive: {"in":"formData","name":"isActive","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new FilesController();


              const promise = controller.uploadAnyMultiple.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/user/check-invitation',
            ...(fetchMiddlewares<RequestHandler>(userController)),
            ...(fetchMiddlewares<RequestHandler>(userController.prototype.checkInvitation)),

            function userController_checkInvitation(request: any, response: any, next: any) {
            const args = {
                    sendResponse: {"in":"res","name":"413","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"resp":{"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true},"success":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":[true]},{"dataType":"enum","enums":[false]}],"required":true}},"required":true}}},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new userController();


              const promise = controller.checkInvitation.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/user/register',
            ...(fetchMiddlewares<RequestHandler>(userController)),
            ...(fetchMiddlewares<RequestHandler>(userController.prototype.createLogin)),

            function userController_createLogin(request: any, response: any, next: any) {
            const args = {
                    sendResponse: {"in":"res","name":"200","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"resp":{"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true},"success":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":[true]},{"dataType":"enum","enums":[false]}],"required":true}},"required":true}}},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new userController();


              const promise = controller.createLogin.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/user/verify-token',
            ...(fetchMiddlewares<RequestHandler>(userController)),
            ...(fetchMiddlewares<RequestHandler>(userController.prototype.verifyAccount)),

            function userController_verifyAccount(request: any, response: any, next: any) {
            const args = {
                    sendResponse: {"in":"res","name":"401","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"resp":{"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true},"success":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":[true]},{"dataType":"enum","enums":[false]}],"required":true}},"required":true}}},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new userController();


              const promise = controller.verifyAccount.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/user/send-token',
            ...(fetchMiddlewares<RequestHandler>(userController)),
            ...(fetchMiddlewares<RequestHandler>(userController.prototype.sendToken)),

            function userController_sendToken(request: any, response: any, next: any) {
            const args = {
                    sendResponse: {"in":"res","name":"401","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"resp":{"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true},"success":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":[true]},{"dataType":"enum","enums":[false]}],"required":true}},"required":true}}},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new userController();


              const promise = controller.sendToken.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/user/login',
            ...(fetchMiddlewares<RequestHandler>(userController)),
            ...(fetchMiddlewares<RequestHandler>(userController.prototype.login)),

            function userController_login(request: any, response: any, next: any) {
            const args = {
                    sendResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"resp":{"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true},"success":{"dataType":"enum","enums":[false],"required":true}},"required":true}}},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new userController();


              const promise = controller.login.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/user/create-profile',
            ...(fetchMiddlewares<RequestHandler>(userController)),
            ...(fetchMiddlewares<RequestHandler>(userController.prototype.createProfile)),

            function userController_createProfile(request: any, response: any, next: any) {
            const args = {
                    sendResponse: {"in":"res","name":"401","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"resp":{"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true},"success":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":[true]},{"dataType":"enum","enums":[false]}],"required":true}},"required":true}}},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new userController();


              const promise = controller.createProfile.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/user/update-profile',
            ...(fetchMiddlewares<RequestHandler>(userController)),
            ...(fetchMiddlewares<RequestHandler>(userController.prototype.updateProfile)),

            function userController_updateProfile(request: any, response: any, next: any) {
            const args = {
                    sendResponse: {"in":"res","name":"200","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"resp":{"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true},"success":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":[true]},{"dataType":"enum","enums":[false]}],"required":true}},"required":true}}},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new userController();


              const promise = controller.updateProfile.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/user/profile',
            ...(fetchMiddlewares<RequestHandler>(userController)),
            ...(fetchMiddlewares<RequestHandler>(userController.prototype.getProfile)),

            function userController_getProfile(request: any, response: any, next: any) {
            const args = {
                    sendResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"resp":{"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true},"success":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":[true]},{"dataType":"enum","enums":[false]}],"required":true}},"required":true}}},
                    user: {"in":"query","name":"user","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new userController();


              const promise = controller.getProfile.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/api/user/get-users',
            ...(fetchMiddlewares<RequestHandler>(userController)),
            ...(fetchMiddlewares<RequestHandler>(userController.prototype.fetchConverts)),

            function userController_fetchConverts(request: any, response: any, next: any) {
            const args = {
                    sendResponse: {"in":"res","name":"409","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"resp":{"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true},"success":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":[true]},{"dataType":"enum","enums":[false]}],"required":true}},"required":true}}},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    Authorization: {"in":"header","name":"Authorization","required":true,"dataType":"string"},
                    search_by: {"in":"query","name":"search_by","dataType":"string"},
                    search_value: {"in":"query","name":"search_value","dataType":"string"},
                    page: {"in":"query","name":"page","dataType":"double"},
                    limit: {"in":"query","name":"limit","dataType":"double"},
                    skip: {"in":"query","name":"skip","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new userController();


              const promise = controller.fetchConverts.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 200, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/user/forgot-password',
            ...(fetchMiddlewares<RequestHandler>(userController)),
            ...(fetchMiddlewares<RequestHandler>(userController.prototype.forgotPassword)),

            function userController_forgotPassword(request: any, response: any, next: any) {
            const args = {
                    sendResponse: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"resp":{"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true},"success":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":[true]},{"dataType":"enum","enums":[false]}],"required":true}},"required":true}}},
                    emailOrMobile: {"in":"body-prop","name":"emailOrMobile","required":true,"dataType":"any"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new userController();


              const promise = controller.forgotPassword.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/api/user/reset-password',
            ...(fetchMiddlewares<RequestHandler>(userController)),
            ...(fetchMiddlewares<RequestHandler>(userController.prototype.resetPassword)),

            function userController_resetPassword(request: any, response: any, next: any) {
            const args = {
                    sendResponse: {"in":"res","name":"401","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"resp":{"dataType":"nestedObjectLiteral","nestedProperties":{"data":{"dataType":"any","required":true},"message":{"dataType":"string","required":true},"success":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":[true]},{"dataType":"enum","enums":[false]}],"required":true}},"required":true}}},
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const controller = new userController();


              const promise = controller.resetPassword.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, 201, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            response.status(statusCode || 200)
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'queries':
                    return validationService.ValidateParam(args[key], request.query, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
