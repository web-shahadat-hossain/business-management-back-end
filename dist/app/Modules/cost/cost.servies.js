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
exports.costServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const main_model_1 = require("../main/main.model");
const cost_mode_1 = require("./cost.mode");
const user_model_1 = require("../user/user.model");
const createCost = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const userFind = yield user_model_1.UB.findOne({ userName: data.userName });
    const mainAmount = yield main_model_1.MainBalance.find({});
    const costData = {
        fullName: data.fullName,
        costAmount: data.costAmount,
        message: data.message,
    };
    const amount = Number(mainAmount[0].mainBalance) - Number(data.costAmount);
    if (Number(amount) >= Number(data.costAmount)) {
        const session = yield mongoose_1.default.startSession();
        let result = null;
        try {
            session.startTransaction();
            yield main_model_1.MainBalance.updateMany({ mainBalance: amount });
            yield user_model_1.UB.updateOne({ userName: data.userName }, { balance: Number(userFind === null || userFind === void 0 ? void 0 : userFind.balance) - Number(data.costAmount) });
            result = yield cost_mode_1.Cost.create(costData);
            yield session.commitTransaction();
            yield session.endSession();
        }
        catch (err) {
            yield session.abortTransaction();
            yield session.endSession();
            throw err;
        }
        if (!result) {
            throw new apiError_1.default(400, 'Failed to added Cost Balance!');
        }
        return result;
    }
    else {
        throw new apiError_1.default(400, 'আপনার কাছে পর্যাপ্ত টাকা নেই!');
    }
});
const getCost = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cost_mode_1.Cost.find({});
    if (!result) {
        throw new apiError_1.default(400, 'Failed to get Cost Data!');
    }
    return result;
});
exports.costServices = {
    createCost,
    getCost,
};
