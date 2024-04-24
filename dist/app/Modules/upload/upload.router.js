"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRouter = void 0;
const express_1 = __importDefault(require("express"));
const upload_controller_1 = require("./upload.controller");
const router = express_1.default.Router();
router.post('/images-upload', upload_controller_1.uploadController.uploadImages);
exports.updateRouter = {
    router,
};
