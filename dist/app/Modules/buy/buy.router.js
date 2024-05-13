"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buyRouters = void 0;
const express_1 = __importDefault(require("express"));
const buy_controller_1 = require("./buy.controller");
// import { balancerController } from './balance.controller';
const router = express_1.default.Router();
router.post('/', buy_controller_1.buyController.createBuy);
router.get('/', buy_controller_1.buyController.getBuy);
router.delete('/:id', buy_controller_1.buyController.deleteBuy);
exports.buyRouters = {
    router,
};
