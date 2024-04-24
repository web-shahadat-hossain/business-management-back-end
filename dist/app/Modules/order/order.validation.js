"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidation = void 0;
const zod_1 = require("zod");
const singleOrderSchema = zod_1.z.object({
    body: zod_1.z.object({
        productsId: zod_1.z.string({ required_error: "Product Id is required" }), // Assuming IProduct is defined similarly
        totalPrice: zod_1.z.string({ required_error: "total Price is required" }),
        quantity: zod_1.z.number(),
        shipping: zod_1.z.string({ required_error: "Shipping is required" }),
        fullName: zod_1.z.string({ required_error: "Name is required" }),
        contactNo: zod_1.z.string({ required_error: "Contact No is required" }),
        email: zod_1.z.string({ required_error: "Email is required" }).email(), // Validate email format
        transactionId: zod_1.z.string({ required_error: "transaction Id is required" }),
        address: zod_1.z.string({ required_error: "Address is required" }),
        comment: zod_1.z.string({ required_error: "Comment is required" }),
    })
});
// Now you can use the `orderSchema` to validate incoming data
exports.orderValidation = {
    singleOrderSchema,
};
