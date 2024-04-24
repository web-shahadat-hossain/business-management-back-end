"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: String },
    image: { type: String, required: true }, // Assuming a single string for image URL
    stock: { type: Number, required: true },
    color: { type: [String] },
    feature: { type: [String] },
    discount: { type: Number },
    reviews: { type: [String], default: [] }, // Array of strings for reviews, default to an empty array
    size: { type: Boolean, default: false }, // Array of strings for size, default to an empty array
}, { timestamps: true });
exports.Product = (0, mongoose_1.model)('Products', productSchema);
