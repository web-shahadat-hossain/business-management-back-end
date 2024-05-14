import mongoose from 'mongoose';
import apiError from '../../../errors/apiError';
import { MainBalance, RMB } from '../main/main.model';
import { IBuy } from './buy.interface';
import { Buy } from './buy.model';

const createBuy = async (data: IBuy) => {
  const totalAmount = Number(data?.rmb) * Number(data?.rate);
  data.status = false;
  const mainAmount = await MainBalance.find({});
  const oldRMB = await RMB.find({});

  const amount = Number(mainAmount[0].mainBalance);

  if (Number(amount) >= Number(totalAmount)) {
    const session = await mongoose.startSession();
    let result = null;

    try {
      session.startTransaction();

      await MainBalance.updateMany({
        mainBalance: Number(amount) - Number(totalAmount),
      });
      await RMB.updateMany({ rmb: Number(oldRMB[0].rmb) + Number(data.rmb) });
      result = await Buy.create(data);
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
  } else {
    throw new apiError(400, 'আপনার কাছে পর্যাপ্ত টাকা নেই!');
  }
};

const getBuy = async (): Promise<IBuy[] | null> => {
  const result = await Buy.find({});

  if (!result) {
    throw new apiError(400, 'Failed to get Buy History!');
  }

  return result;
};
const deleteBuy = async (id: string): Promise<IBuy | null> => {
  const buyHistory = await Buy.findOne({ _id: id });
  const mainAmount = await MainBalance.find({});
  const oldRMB = await RMB.find({});

  const amount = Number(mainAmount[0].mainBalance);

  if (!buyHistory) {
    throw new apiError(400, 'Failed to buy!');
  }

  const totalAmount = Number(buyHistory?.rmb) * Number(buyHistory?.rate);

  const session = await mongoose.startSession();
  let result = null;

  try {
    session.startTransaction();

    await MainBalance.updateMany({
      mainBalance: Number(amount) + Number(totalAmount),
    });
    await RMB.updateMany({
      rmb: Number(oldRMB[0].rmb) - Number(buyHistory.rmb),
    });

    result = await Buy.findByIdAndDelete({ _id: id });

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

export const buyServices = {
  createBuy,
  getBuy,
  deleteBuy,
};
