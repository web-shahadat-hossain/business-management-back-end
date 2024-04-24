"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apiError_1 = __importDefault(require("../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const jwtHelpers_1 = require("../helpers/jwtHelpers");
const config_1 = __importDefault(require("../config"));
const authRequest = (...requireRole) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'you are not authorize');
        }
        //   verified token
        const verifyUser = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret_token);
        req.user = verifyUser;
        if (requireRole.length && !requireRole.includes(verifyUser.role)) {
            throw new apiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden');
        }
        next();
    }
    catch (err) {
        next(err);
    }
});
exports.default = authRequest;
