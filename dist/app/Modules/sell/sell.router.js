"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellRouters = void 0;
const express_1 = __importDefault(require("express"));
const sell_controller_1 = require("./sell.controller");
// import { balancerController } from './balance.controller';
const router = express_1.default.Router();
router.post('/', sell_controller_1.sellController.createSell);
router.get('/', sell_controller_1.sellController.getSell);
router.delete('/:id', sell_controller_1.sellController.sellDelete);
exports.sellRouters = {
    router,
};
