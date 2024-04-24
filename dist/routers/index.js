"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const modules_routes_1 = __importDefault(require("./modules.routes"));
const routers = express_1.default.Router();
modules_routes_1.default.forEach(route => routers.use(route.path, route.route));
exports.default = routers;
