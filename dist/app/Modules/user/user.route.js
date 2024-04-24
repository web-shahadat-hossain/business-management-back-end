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
const authRequest_1 = __importDefault(require("../../../middleware/authRequest"));
const role_1 = require("../../../enums/role");
const router = express_1.default.Router();
router.post('/create-user', (0, validateRequest_1.default)(user_validation_1.UserValidation.createUserZodSchema), user_controller_1.userController.createUser);
router.get('/:email', (0, authRequest_1.default)(role_1.ENUM_ROLE.user, role_1.ENUM_ROLE.ADMIN, role_1.ENUM_ROLE.superAdmin), user_controller_1.userController.findOneUser);
router.delete('/:id', user_controller_1.userController.userDelete);
router.patch('/:id', (0, authRequest_1.default)(role_1.ENUM_ROLE.ADMIN, role_1.ENUM_ROLE.superAdmin), (0, validateRequest_1.default)(user_validation_1.UserValidation.updateUser), user_controller_1.userController.userUpdate);
router.patch('/admin/:id', (0, authRequest_1.default)(role_1.ENUM_ROLE.superAdmin), user_controller_1.userController.userAdmin);
router.get('/', (0, authRequest_1.default)(role_1.ENUM_ROLE.superAdmin), user_controller_1.userController.userAllData);
exports.userRouters = {
    router,
};
