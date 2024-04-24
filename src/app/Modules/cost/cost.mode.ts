import { Schema, model } from 'mongoose';
import { ICost } from './cost.interface';

// Create the Mongoose schema
const costSchema = new Schema<ICost>(
  {
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Cost = model<ICost>('cost', costSchema);
// Create the Mongoose schema
