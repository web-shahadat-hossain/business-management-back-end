"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Balance = void 0;
const mongoose_1 = require("mongoose");
// Create the Mongoose schema
const balanceSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true,
    },
    mainBalance: {
        type: Number,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Balance = (0, mongoose_1.model)('balanceHistory', balanceSchema);
// Create the Mongoose schema
