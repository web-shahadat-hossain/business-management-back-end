"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouters = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const validateRequest_1 = __importDefault(require("../../../middleware/validateRequest"));
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(user_validation_1.UserValidation.createUserZodSchema), user_controller_1.userController.createUser);
router.post('/balance', user_controller_1.userController.createUserBalance);
router.get('/balance', user_controller_1.userController.getUserBalance);
exports.userRouters = {
    router,
};
