"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.costRouters = void 0;
const express_1 = __importDefault(require("express"));
const cost_controller_1 = require("./cost.controller");
// import { balancerController } from './balance.controller';
const router = express_1.default.Router();
router.post('/', cost_controller_1.costController.createCost);
router.get('/', cost_controller_1.costController.getCost);
exports.costRouters = {
    router,
};
