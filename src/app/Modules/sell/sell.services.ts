import mongoose from 'mongoose';
import apiError from '../../../errors/apiError';
import { MainBalance, Profit, RMB } from '../main/main.model';
import { ISell } from './sell.interface';
import { Sell } from './sell.model';

const createSell = async (data: ISell) => {
  const sellAmount = Number(data?.rmb) * Number(data?.sellRate);
  const buyAmount = Number(data?.rmb) * Number(data?.buyRate);

  const profit = Number(sellAmount) - Number(buyAmount);

  const oldMainAmount = await MainBalance.find({});
  const oldRMB = await RMB.find({});
  const oldProfit = await Profit.find({});

  const amount = Number(oldMainAmount[0].mainBalance);

  if (Number(oldRMB[0].rmb) >= Number(data.rmb)) {
    const session = await mongoose.startSession();
    let result = null;

    try {
      session.startTransaction();

      await MainBalance.updateMany({
        mainBalance: Number(amount) + Number(sellAmount),
      });

      await RMB.updateMany({ rmb: Number(oldRMB[0].rmb) - Number(data.rmb) });

      await Profit.updateMany({
        amount: Number(oldProfit[0].amount) + Number(profit),
      });

      result = await Sell.create({ ...data, profit: profit });
      await session.commitTransaction();
      await session.endSession();
    } catch (err) {
      await session.abortTransaction();
      await session.endSession();
      throw err;
    }

    if (!result) {
      throw new apiError(400, 'Failed to Sell!');
    }

    return result;
  } else {
    throw new apiError(400, 'আপনার কাছে পর্যাপ্ত RMB নেই!');
  }
};

const getSell = async (): Promise<ISell[] | null> => {
  const result = await Sell.find({});

  if (!result) {
    throw new apiError(400, 'Failed to get Sell!');
  }

  return result;
};

export const sellServices = {
  createSell,
  getSell,
};
