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
exports.sellServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const main_model_1 = require("../main/main.model");
const sell_model_1 = require("./sell.model");
const buy_model_1 = require("../buy/buy.model");
const createSell = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const sellAmount = Number(data === null || data === void 0 ? void 0 : data.rmb) * Number(data === null || data === void 0 ? void 0 : data.sellRate);
    const buyAmount = Number(data === null || data === void 0 ? void 0 : data.rmb) * Number(data === null || data === void 0 ? void 0 : data.buyRate);
    const profit = Number(sellAmount) - Number(buyAmount);
    const oldMainAmount = yield main_model_1.MainBalance.find({});
    const oldRMB = yield main_model_1.RMB.find({});
    const oldProfit = yield main_model_1.Profit.find({});
    const amount = Number(oldMainAmount[0].mainBalance);
    if (sellAmount >= buyAmount) {
        if (Number(oldRMB[0].rmb) >= Number(data.rmb)) {
            const session = yield mongoose_1.default.startSession();
            let result = null;
            try {
                session.startTransaction();
                yield main_model_1.MainBalance.updateMany({
                    mainBalance: Number(amount) + Number(sellAmount),
                });
                yield buy_model_1.Buy.updateOne({
                    _id: data.userName,
                }, { status: true });
                yield main_model_1.RMB.updateMany({ rmb: Number(oldRMB[0].rmb) - Number(data.rmb) });
                yield main_model_1.Profit.updateMany({
                    amount: Number(oldProfit[0].amount) + Number(profit),
                });
                result = yield sell_model_1.Sell.create(Object.assign(Object.assign({}, data), { profit: profit }));
                yield session.commitTransaction();
                yield session.endSession();
            }
            catch (err) {
                yield session.abortTransaction();
                yield session.endSession();
                throw err;
            }
            if (!result) {
                throw new apiError_1.default(400, 'Failed to Sell!');
            }
            return result;
        }
        else {
            throw new apiError_1.default(400, 'আপনার কাছে পর্যাপ্ত RMB নেই!');
        }
    }
    else {
        if (Number(oldRMB[0].rmb) >= Number(data.rmb)) {
            const session = yield mongoose_1.default.startSession();
            let result = null;
            try {
                session.startTransaction();
                yield main_model_1.MainBalance.updateMany({
                    mainBalance: Number(amount) + Number(sellAmount),
                });
                yield main_model_1.RMB.updateMany({ rmb: Number(oldRMB[0].rmb) - Number(data.rmb) });
                yield buy_model_1.Buy.updateOne({
                    _id: data.userName,
                }, { status: true });
                result = yield sell_model_1.Sell.create(Object.assign(Object.assign({}, data), { profit: profit }));
                yield session.commitTransaction();
                yield session.endSession();
            }
            catch (err) {
                yield session.abortTransaction();
                yield session.endSession();
                throw err;
            }
            if (!result) {
                throw new apiError_1.default(400, 'Failed to Sell!');
            }
            return result;
        }
        else {
            throw new apiError_1.default(400, 'আপনার কাছে পর্যাপ্ত RMB নেই!');
        }
    }
});
const getSell = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield sell_model_1.Sell.find({});
    if (!result) {
        throw new apiError_1.default(400, 'Failed to get Sell!');
    }
    return result;
});
const deleteSell = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const sellHistory = yield sell_model_1.Sell.findOne({ _id: id });
    const mainAmount = yield main_model_1.MainBalance.find({});
    const oldRMB = yield main_model_1.RMB.find({});
    const oldProfit = yield main_model_1.Profit.find({});
    const amount = Number(mainAmount[0].mainBalance);
    if (!sellHistory) {
        throw new apiError_1.default(400, 'Failed to sell!');
    }
    const totalAmount = Number(sellHistory === null || sellHistory === void 0 ? void 0 : sellHistory.rmb) * Number(sellHistory === null || sellHistory === void 0 ? void 0 : sellHistory.sellRate);
    const buyAmount = Number(totalAmount) -
        Number(sellHistory === null || sellHistory === void 0 ? void 0 : sellHistory.rmb) * Number(sellHistory === null || sellHistory === void 0 ? void 0 : sellHistory.buyRate);
    const session = yield mongoose_1.default.startSession();
    let result = null;
    try {
        session.startTransaction();
        yield main_model_1.MainBalance.updateMany({
            mainBalance: Number(amount) - Number(totalAmount),
        });
        yield main_model_1.RMB.updateMany({
            rmb: Number(oldRMB[0].rmb) + Number(sellHistory.rmb),
        });
        yield main_model_1.Profit.updateMany({
            amount: Number(oldProfit[0].amount) - Number(buyAmount),
        });
        result = yield sell_model_1.Sell.findByIdAndDelete({ _id: id });
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
exports.sellServices = {
    createSell,
    getSell,
    deleteSell,
};
