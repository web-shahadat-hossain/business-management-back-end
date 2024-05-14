import mongoose from 'mongoose';
import apiError from '../../../errors/apiError';
import { MainBalance, Profit, RMB } from '../main/main.model';
import { ISell } from './sell.interface';
import { Sell } from './sell.model';
import { Buy } from '../buy/buy.model';

const createSell = async (data: ISell) => {
  const sellAmount = Number(data?.rmb) * Number(data?.sellRate);
  const buyAmount = Number(data?.rmb) * Number(data?.buyRate);

  const profit = Number(sellAmount) - Number(buyAmount);

  const oldMainAmount = await MainBalance.find({});

  const oldRMB = await RMB.find({});
  const oldProfit = await Profit.find({});

  const amount = Number(oldMainAmount[0].mainBalance);

  if (sellAmount >= buyAmount) {
    if (Number(oldRMB[0].rmb) >= Number(data.rmb)) {
      const session = await mongoose.startSession();
      let result = null;

      try {
        session.startTransaction();

        await MainBalance.updateMany({
          mainBalance: Number(amount) + Number(sellAmount),
        });
        await Buy.updateOne(
          {
            _id: data.userName,
          },
          { status: true }
        );

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
  } else {
    if (Number(oldRMB[0].rmb) >= Number(data.rmb)) {
      const session = await mongoose.startSession();
      let result = null;

      try {
        session.startTransaction();

        await MainBalance.updateMany({
          mainBalance: Number(amount) + Number(sellAmount),
        });

        await RMB.updateMany({ rmb: Number(oldRMB[0].rmb) - Number(data.rmb) });
        await Buy.updateOne(
          {
            _id: data.userName,
          },
          { status: true }
        );
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
  }
};

const getSell = async (): Promise<ISell[] | null> => {
  const result = await Sell.find({});

  if (!result) {
    throw new apiError(400, 'Failed to get Sell!');
  }

  return result;
};

const deleteSell = async (id: string): Promise<ISell | null> => {
  const sellHistory = await Sell.findOne({ _id: id });
  const mainAmount = await MainBalance.find({});
  const oldRMB = await RMB.find({});
  const oldProfit = await Profit.find({});

  const amount = Number(mainAmount[0].mainBalance);

  if (!sellHistory) {
    throw new apiError(400, 'Failed to sell!');
  }

  const totalAmount = Number(sellHistory?.rmb) * Number(sellHistory?.sellRate);
  const buyAmount =
    Number(totalAmount) -
    Number(sellHistory?.rmb) * Number(sellHistory?.buyRate);

  const session = await mongoose.startSession();
  let result = null;

  try {
    session.startTransaction();

    await MainBalance.updateMany({
      mainBalance: Number(amount) - Number(totalAmount),
    });
    await RMB.updateMany({
      rmb: Number(oldRMB[0].rmb) + Number(sellHistory.rmb),
    });
    await Profit.updateMany({
      amount: Number(oldProfit[0].amount) - Number(buyAmount),
    });
    result = await Sell.findByIdAndDelete({ _id: id });

    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }

  if (!result) {
    throw new apiError(400, 'Failed to buy!');
  }

  return result;
};

export const sellServices = {
  createSell,
  getSell,
  deleteSell,
};
