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
exports.uploadController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const cloudinary_1 = require("cloudinary");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
cloudinary_1.v2.config({
    cloud_name: 'djxcn5dkb',
    api_key: '695674837128538',
    api_secret: 'kLs6S4X7mNdqY2Kn9jz-mdohlYo'
});
const uploadImages = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = (req.files && req.files.photo);
    if (!file) {
        throw new apiError_1.default(400, 'No file provided!');
    }
    // Use the temp file path for uploading to Cloudinary
    cloudinary_1.v2.uploader.upload(file.tempFilePath, (error, result) => {
        if (error) {
            throw new apiError_1.default(500, 'Error uploading file to Cloudinary!');
        }
        else {
            (0, sendResponse_1.default)(res, {
                statusCode: http_status_1.default.OK,
                success: true,
                message: 'File uploaded successfully!',
                data: result,
            });
        }
    });
}));
exports.uploadController = {
    uploadImages,
};
