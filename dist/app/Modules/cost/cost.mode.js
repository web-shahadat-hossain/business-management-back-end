"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cost = void 0;
const mongoose_1 = require("mongoose");
// Create the Mongoose schema
const costSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true,
    },
    costAmount: {
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
exports.Cost = (0, mongoose_1.model)('cost', costSchema);
// Create the Mongoose schema
