"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.string({}).optional(),
        password: zod_1.z.string({ required_error: 'Password is required' }),
        name: zod_1.z.string({ required_error: 'Name is required' }),
        email: zod_1.z.string({ required_error: 'Email is required' }),
        image: zod_1.z.string({}).optional(),
        contactNo: zod_1.z.string({}).optional(),
        address: zod_1.z.string({}).optional(),
    }),
});
const updateUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        contactNo: zod_1.z.string().optional(),
        address: zod_1.z.string().optional(),
        image: zod_1.z.string().optional(),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
    updateUser
};
