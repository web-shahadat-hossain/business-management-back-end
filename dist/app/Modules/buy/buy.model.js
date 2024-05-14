"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Buy = void 0;
const mongoose_1 = require("mongoose");
// Create the Mongoose schema
const buySchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true,
    },
    rate: {
        type: Number,
        required: true,
    },
    rmb: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Buy = (0, mongoose_1.model)('buy', buySchema);
// Create the Mongoose schema
