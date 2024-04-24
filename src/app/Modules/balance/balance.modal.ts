import { Schema, model } from 'mongoose';
import { IBalance } from './balance.interface';

// Create the Mongoose schema
const balanceSchema = new Schema<IBalance>(
  {
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Balance = model<IBalance>('balanceHistory', balanceSchema);
// Create the Mongoose schema
