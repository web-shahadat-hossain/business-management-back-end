"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouters = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middleware/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.authValidation.loginAuthZodSchema), auth_controller_1.authController.loginUser);
router.get('/verify', auth_controller_1.authController.verifyUserToken);
router.post('/logout', auth_controller_1.authController.logoutUser);
// router.post(
//   '/refresh-token',
//   validateRequest(authValidation.refreshTokenZodSchema),
//   authController.refreshToken
// );
exports.authRouters = {
    router,
};
