"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
// Create the Mongoose schema
const orderSchema = new mongoose_1.Schema({
    products: {
        type: [],
        required: true,
    },
    totalPrice: {
        type: String,
        required: true,
    },
    shippingMethod: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
    },
    status: {
        type: Boolean,
        required: true,
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
// Create the Mongoose schema
