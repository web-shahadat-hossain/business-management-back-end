import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({}).optional(),
    password: z.string({ required_error: 'Password is required' }),
    name: z.string({ required_error: 'Name is required' }),
    email: z.string({ required_error: 'Email is required' }),
    image: z.string({}).optional(),
    contactNo: z.string({}).optional(),
    address: z.string({}).optional(),
  }),
});

const updateUser = z.object({
  body: z.object({
    name: z.string().optional(),
    password: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUser,
};
