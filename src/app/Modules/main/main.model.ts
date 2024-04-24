import { Schema, model } from 'mongoose';
import { IMainBalance, IMainRMB, IProfit } from './main.interface';

// Create the Mongoose schema
const mainBalanceSchema = new Schema<IMainBalance>(
  {
    mainBalance: {
      type: Number,
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

export const MainBalance = model<IMainBalance>(
  'mainBalance',
  mainBalanceSchema
);
// Create the Mongoose schema
const mainRMBSchema = new Schema<IMainRMB>(
  {
    rmb: {
      type: Number,
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

export const RMB = model<IMainRMB>('RMB', mainRMBSchema);

const profitSchema = new Schema<IProfit>(
  {
    amount: {
      type: Number,
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

export const Profit = model<IProfit>('profit', profitSchema);

// Create the Mongoose schema
