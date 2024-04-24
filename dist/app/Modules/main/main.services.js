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
exports.balancerServices = void 0;
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const main_model_1 = require("./main.model");
const createBalance = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield main_model_1.MainBalance.create(data);
    if (!result) {
        throw new apiError_1.default(400, 'Failed to added balance!');
    }
    return result;
});
const createRMB = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield main_model_1.RMB.create(data);
    if (!result) {
        throw new apiError_1.default(400, 'Failed to added balance!');
    }
    return result;
});
const getBalance = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield main_model_1.MainBalance.find({});
    if (!result) {
        throw new apiError_1.default(400, 'Failed to added balance!');
    }
    return result;
});
const getRMB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield main_model_1.RMB.find({});
    if (!result) {
        throw new apiError_1.default(400, 'Failed to added balance!');
    }
    return result;
});
const getProfit = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield main_model_1.Profit.find({});
    if (!result) {
        throw new apiError_1.default(400, 'Failed to added balance!');
    }
    return result;
});
const createProfit = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield main_model_1.Profit.create(data);
    if (!result) {
        throw new apiError_1.default(400, 'Failed to added Profit!');
    }
    return result;
});
exports.balancerServices = {
    createBalance,
    getBalance,
    createRMB,
    getRMB,
    createProfit,
    getProfit,
};
