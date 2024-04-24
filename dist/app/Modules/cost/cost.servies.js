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
const mongoose_1 = __importDefault(require("mongoose"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const main_model_1 = require("../main/main.model");
const cost_mode_1 = require("./cost.mode");
const createCost = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const mainAmount = yield main_model_1.MainBalance.find({});
    const amount = Number(mainAmount[0].mainBalance) - Number(data.costAmount);
    if (Number(amount) >= Number(data.costAmount)) {
        const session = yield mongoose_1.default.startSession();
        let result = null;
        try {
            session.startTransaction();
            yield main_model_1.MainBalance.updateMany({ mainBalance: amount });
            result = yield cost_mode_1.Cost.create(data);
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
