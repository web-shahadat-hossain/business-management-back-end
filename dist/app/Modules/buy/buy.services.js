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
exports.buyServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const main_model_1 = require("../main/main.model");
const buy_model_1 = require("./buy.model");
const createBuy = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const totalAmount = Number(data === null || data === void 0 ? void 0 : data.rmb) * Number(data === null || data === void 0 ? void 0 : data.rate);
    data.status = false;
    const mainAmount = yield main_model_1.MainBalance.find({});
    const oldRMB = yield main_model_1.RMB.find({});
    const amount = Number(mainAmount[0].mainBalance);
    if (Number(amount) >= Number(totalAmount)) {
        const session = yield mongoose_1.default.startSession();
        let result = null;
        try {
            session.startTransaction();
            yield main_model_1.MainBalance.updateMany({
                mainBalance: Number(amount) - Number(totalAmount),
            });
            yield main_model_1.RMB.updateMany({ rmb: Number(oldRMB[0].rmb) + Number(data.rmb) });
            result = yield buy_model_1.Buy.create(data);
            yield session.commitTransaction();
            yield session.endSession();
        }
        catch (err) {
            yield session.abortTransaction();
            yield session.endSession();
            throw err;
        }
        if (!result) {
            throw new apiError_1.default(400, 'Failed to buy!');
        }
        return result;
    }
    else {
        throw new apiError_1.default(400, 'আপনার কাছে পর্যাপ্ত টাকা নেই!');
    }
});
const getBuy = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield buy_model_1.Buy.find({});
    if (!result) {
        throw new apiError_1.default(400, 'Failed to get Buy History!');
    }
    return result;
});
const deleteBuy = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const buyHistory = yield buy_model_1.Buy.findOne({ _id: id });
    const mainAmount = yield main_model_1.MainBalance.find({});
    const oldRMB = yield main_model_1.RMB.find({});
    const amount = Number(mainAmount[0].mainBalance);
    if (!buyHistory) {
        throw new apiError_1.default(400, 'Failed to buy!');
    }
    const totalAmount = Number(buyHistory === null || buyHistory === void 0 ? void 0 : buyHistory.rmb) * Number(buyHistory === null || buyHistory === void 0 ? void 0 : buyHistory.rate);
    const session = yield mongoose_1.default.startSession();
    let result = null;
    try {
        session.startTransaction();
        yield main_model_1.MainBalance.updateMany({
            mainBalance: Number(amount) + Number(totalAmount),
        });
        yield main_model_1.RMB.updateMany({
            rmb: Number(oldRMB[0].rmb) - Number(buyHistory.rmb),
        });
        result = yield buy_model_1.Buy.findByIdAndDelete({ _id: id });
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw err;
    }
    if (!result) {
        throw new apiError_1.default(400, 'Failed to buy!');
    }
    return result;
});
exports.buyServices = {
    createBuy,
    getBuy,
    deleteBuy,
};
