"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CastErrorHandler = (err) => {
    const errors = [
        {
            path: err === null || err === void 0 ? void 0 : err.path,
            message: 'Invalid Object Id',
        },
    ];
    return {
        statusCode: 400,
        message: 'Cast Error',
        errorMessages: errors,
    };
};
exports.default = CastErrorHandler;
