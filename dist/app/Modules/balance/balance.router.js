"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.balanceRouters = void 0;
const express_1 = __importDefault(require("express"));
const balance_controller_1 = require("./balance.controller");
const router = express_1.default.Router();
router.post('/', balance_controller_1.balancerController.createBalance);
router.get('/', balance_controller_1.balancerController.getBalance);
exports.balanceRouters = {
    router,
};
