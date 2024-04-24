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
exports.authServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    const isExistUser = yield user_model_1.User.findOne({ email }, { _id: 1, password: 1, role: 1, email: 1 }).lean();
    if (!isExistUser) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // password match
    const matchPassword = yield bcrypt_1.default.compare(password, isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.password);
    if (!matchPassword) {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'password is incorrect');
    }
    const secretToken = jwtHelpers_1.jwtHelpers.createToken({ email: isExistUser.email, role: isExistUser.role }, config_1.default.jwt.secret_token, config_1.default.jwt.secret_expire_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ email: isExistUser.email, role: isExistUser.role }, config_1.default.jwt.refresh_token, config_1.default.jwt.refresh_expire_in);
    return {
        secretToken,
        refreshToken,
        email: isExistUser.email
    };
});
const verifyUserToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, 'you are not authorize');
    }
    //   verified token
    const verifyUserToken = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_token);
    const { email, role } = verifyUserToken;
    return {
        verify: true,
        email,
        role
    };
});
exports.authServices = {
    loginUser,
    verifyUserToken
};
