"use strict";
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-console
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const validationErrorHandler_1 = require("../errors/validationErrorHandler");
const apiError_1 = __importDefault(require("../errors/apiError"));
const zod_1 = require("zod");
const validationZodErrorHandler_1 = require("../errors/validationZodErrorHandler");
const CastErrorHandler_1 = __importDefault(require("../errors/CastErrorHandler"));
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler = (error, req, res, next) => {
    console.error('Global Error Handler.......', error);
    // error pattern
    let statusCode = 500;
    let message = 'something went wrong!';
    let errorMessages = [];
    // mongos validationErrorHandler code start
    if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
        const simplifiedError = (0, validationErrorHandler_1.validationErrorHandler)(error);
        (statusCode = simplifiedError.statusCode),
            (message = simplifiedError.message),
            (errorMessages = simplifiedError.errorMessages);
    }
    else if (error instanceof zod_1.ZodError) {
        const simplifiedError = (0, validationZodErrorHandler_1.validationZodErrorHandler)(error);
        (statusCode = simplifiedError.statusCode),
            (message = simplifiedError.message),
            (errorMessages = simplifiedError.errorMessages);
    }
    else if (error instanceof apiError_1.default) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    else if (error.name === 'CastError') {
        const simplifiedError = (0, CastErrorHandler_1.default)(error);
        (statusCode = simplifiedError.statusCode),
            (message = simplifiedError.message),
            (errorMessages = simplifiedError.errorMessages);
    }
    else if (error instanceof Error) {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message)
            ? [
                {
                    path: '',
                    message: error === null || error === void 0 ? void 0 : error.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message: message,
        errorMessages: errorMessages,
        stack: config_1.default.env !== 'production' ? error === null || error === void 0 ? void 0 : error.stack : undefined,
    });
};
exports.default = globalErrorHandler;
