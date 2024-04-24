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
exports.orderServices = void 0;
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const order_modal_1 = require("./order.modal");
const createOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    data.status = false;
    const result = (yield order_modal_1.Order.create(data));
    if (!result) {
        throw new apiError_1.default(400, 'Failed to Order!');
    }
    return result;
});
const getAllOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_modal_1.Order.find({});
    if (!result) {
        throw new apiError_1.default(400, 'Failed to Order get!');
    }
    return result;
});
const updateOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = (_a = (yield order_modal_1.Order.findOneAndUpdate({ _id: id }, { status: true }, {
        new: true,
    }))) === null || _a === void 0 ? void 0 : _a.populate('productsId');
    if (!result) {
        throw new apiError_1.default(400, 'Failed to Order Update!');
    }
    return result;
});
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (yield order_modal_1.Order.findByIdAndDelete({ _id: id }));
    return result;
});
exports.orderServices = {
    createOrder,
    getAllOrder,
    updateOrder,
    deleteOrder,
};
