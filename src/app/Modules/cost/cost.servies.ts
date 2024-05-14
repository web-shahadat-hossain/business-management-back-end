/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import apiError from '../../../errors/apiError';
import { MainBalance } from '../main/main.model';
import { ICost } from './cost.interface';
import { Cost } from './cost.mode';
import { UB } from '../user/user.model';

const createCost = async (data: any): Promise<ICost | null> => {
  const userFind = await UB.findOne({ userName: data.userName });

  const mainAmount = await MainBalance.find({});
  const costData = {
    fullName: data.fullName,
    costAmount: data.costAmount,
    message: data.message,
  };
  const amount = Number(mainAmount[0].mainBalance) - Number(data.costAmount);

  if (Number(amount) >= Number(data.costAmount)) {
    const session = await mongoose.startSession();
    let result = null;

    try {
      session.startTransaction();

      await MainBalance.updateMany({ mainBalance: amount });
      await UB.updateOne(
        { userName: data.userName },
        { balance: Number(userFind?.balance) - Number(data.costAmount) }
      );
      result = await Cost.create(costData);

      await session.commitTransaction();
      await session.endSession();
    } catch (err) {
      await session.abortTransaction();
      await session.endSession();
      throw err;
    }

    if (!result) {
      throw new apiError(400, 'Failed to added Cost Balance!');
    }

    return result;
  } else {
    throw new apiError(400, 'আপনার কাছে পর্যাপ্ত টাকা নেই!');
  }
};

const getCost = async (): Promise<ICost[] | null> => {
  const result = await Cost.find({});

  if (!result) {
    throw new apiError(400, 'Failed to get Cost Data!');
  }

  return result;
};

export const costServices = {
  createCost,
  getCost,
};
