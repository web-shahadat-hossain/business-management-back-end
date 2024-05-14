"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sell = void 0;
const mongoose_1 = require("mongoose");
// Create the Mongoose schema
const sellSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true,
    },
    buyRate: {
        type: Number,
        required: true,
    },
    sellRate: {
        type: Number,
        required: true,
    },
    rmb: {
        type: Number,
        required: true,
    },
    profit: {
        type: Number,
    },
    userName: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Sell = (0, mongoose_1.model)('sell', sellSchema);
// Create the Mongoose schema
