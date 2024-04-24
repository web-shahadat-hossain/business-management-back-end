"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profit = exports.RMB = exports.MainBalance = void 0;
const mongoose_1 = require("mongoose");
// Create the Mongoose schema
const mainBalanceSchema = new mongoose_1.Schema({
    mainBalance: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.MainBalance = (0, mongoose_1.model)('mainBalance', mainBalanceSchema);
// Create the Mongoose schema
const mainRMBSchema = new mongoose_1.Schema({
    rmb: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.RMB = (0, mongoose_1.model)('RMB', mainRMBSchema);
const profitSchema = new mongoose_1.Schema({
    amount: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Profit = (0, mongoose_1.model)('profit', profitSchema);
// Create the Mongoose schema
