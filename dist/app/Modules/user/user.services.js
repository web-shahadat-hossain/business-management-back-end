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
exports.userServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const role_1 = require("../../../enums/role");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const user_model_1 = require("./user.model");
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    user.role = role_1.ENUM_ROLE.user;
    const isExistUser = yield user_model_1.User.findOne({ email: user.email }, { _id: 1, password: 1, role: 1, email: 1 }).lean();
    if (isExistUser) {
        throw new apiError_1.default(400, 'Email is already used!');
    }
    const result = yield user_model_1.User.create(user);
    if (!result) {
        throw new apiError_1.default(400, 'Failed to create User!');
    }
    return result;
});
const findOneUser = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ email });
    if (!result) {
        throw new apiError_1.default(400, 'User not found!');
    }
    return result;
});
// update user services
const updateUsers = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield user_model_1.User.findOne({ _id: id });
    if (!exist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const allowedProperties = {
        name: payload.name,
        password: payload.password,
        contactNo: payload.contactNo,
        address: payload.address,
        image: payload.image,
    };
    const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, allowedProperties, {
        new: true,
    });
    return result;
});
// admin user services
const adminUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield user_model_1.User.findOne({ _id: id });
    if (!exist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, {
        role: role_1.ENUM_ROLE.ADMIN,
    }, {
        new: true,
    });
    return result;
});
// delete User services
const deleteUsers = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndDelete({ _id: id });
    return result;
});
// get all user services
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    // pagination code start here
    const result = yield user_model_1.User.find({});
    return result;
});
const createUserBalance = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UB.create(user);
    if (!result) {
        throw new apiError_1.default(400, 'Failed to create User Balance!');
    }
    return result;
});
const getUserBalance = () => __awaiter(void 0, void 0, void 0, function* () {
    // pagination code start here
    const result = yield user_model_1.UB.find({});
    return result;
});
exports.userServices = {
    createUser,
    findOneUser,
    deleteUsers,
    updateUsers,
    getAllUsers,
    adminUser,
    createUserBalance,
    getUserBalance,
};
