import { Schema, model } from 'mongoose';
import { ISell } from './sell.interface';

// Create the Mongoose schema
const sellSchema = new Schema<ISell>(
  {
    fullName: {
      type: String,
      required: true,
    },
    buyRate: {
      type: Number,
      required: true,
    },
    sellRate: {
      type: Number,
      required: true,
    },
    rmb: {
      type: Number,
      required: true,
    },
    profit: {
      type: Number,
    },
    userName: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Sell = model<ISell>('sell', sellSchema);
// Create the Mongoose schema
