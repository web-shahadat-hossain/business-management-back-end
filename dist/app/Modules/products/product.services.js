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
exports.productServices = void 0;
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const product_model_1 = require("./product.model");
const createProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(data);
    if (!result) {
        throw new apiError_1.default(400, 'Failed to create Products!');
    }
    return result;
});
const allProductsServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find({});
    if (!result) {
        throw new apiError_1.default(400, 'Failed to get Products!');
    }
    return result;
});
const singleProductsServices = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById({ _id: id });
    if (!result) {
        throw new apiError_1.default(400, 'Failed to single Products!');
    }
    return result;
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndDelete({ _id: id });
    if (!result) {
        throw new apiError_1.default(400, 'Failed to Delete Products!');
    }
    return result;
});
// Import statements
const updateProduct = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(id, data, { new: true });
    if (!result) {
        throw new apiError_1.default(400, 'Failed to update Product!');
    }
    return result;
});
exports.productServices = {
    createProduct,
    allProductsServices,
    singleProductsServices,
    deleteProduct,
    updateProduct
};
