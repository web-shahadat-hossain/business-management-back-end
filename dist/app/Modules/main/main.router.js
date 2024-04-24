"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouters = void 0;
const express_1 = __importDefault(require("express"));
const main_controller_1 = require("./main.controller");
const router = express_1.default.Router();
router.post('/balance', main_controller_1.balancerController.createBalance);
router.get('/balance', main_controller_1.balancerController.getBalance);
router.post('/rmb', main_controller_1.balancerController.createRMB);
router.get('/rmb', main_controller_1.balancerController.getRMB);
router.post('/profit', main_controller_1.balancerController.createProfit);
router.get('/profit', main_controller_1.balancerController.getProfit);
exports.mainRouters = {
    router,
};
