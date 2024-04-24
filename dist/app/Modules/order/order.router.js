"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouters = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const authRequest_1 = __importDefault(require("../../../middleware/authRequest"));
const role_1 = require("../../../enums/role");
const router = express_1.default.Router();
router.post('/', order_controller_1.orderController.createOrder);
router.patch('/:id', (0, authRequest_1.default)(role_1.ENUM_ROLE.ADMIN, role_1.ENUM_ROLE.superAdmin), order_controller_1.orderController.updateOrder);
router.delete('/:id', (0, authRequest_1.default)(role_1.ENUM_ROLE.ADMIN, role_1.ENUM_ROLE.superAdmin), order_controller_1.orderController.deleteOrder);
router.get('/', (0, authRequest_1.default)(role_1.ENUM_ROLE.ADMIN, role_1.ENUM_ROLE.superAdmin), order_controller_1.orderController.getAllOrder);
exports.orderRouters = {
    router,
};
