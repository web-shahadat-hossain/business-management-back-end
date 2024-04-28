import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const userSchema = new Schema<IUser>(
  {
    role: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    contactNo: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  // password hash
  this.password = await bcrypt.hash(
    this.password,
    Number(config.default_bcrypt_salt_rounds)
  );
  next();
});

export const User = model<IUser>('Users', userSchema);
