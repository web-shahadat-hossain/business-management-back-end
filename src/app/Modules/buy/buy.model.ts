import { Schema, model } from 'mongoose';
import { IBuy } from './buy.interface';

// Create the Mongoose schema
const buySchema = new Schema<IBuy>(
  {
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Buy = model<IBuy>('buy', buySchema);
// Create the Mongoose schema
