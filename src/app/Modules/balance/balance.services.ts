import mongoose from 'mongoose';
import apiError from '../../../errors/apiError';
import { MainBalance } from '../main/main.model';
import { IBalance } from './balance.interface';
import { Balance } from './balance.modal';

const createBalance = async (data: IBalance): Promise<IBalance | null> => {
  const mainAmount = await MainBalance.find({});

  const amount = Number(mainAmount[0].mainBalance) + Number(data.mainBalance);

  const session = await mongoose.startSession();
  let result = null;

  try {
    session.startTransaction();

    await MainBalance.updateMany({ mainBalance: amount });

    result = await Balance.create(data);

    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw err;
  }

  if (!result) {
    throw new apiError(400, 'Failed to added balance!');
  }

  return result;
};

const getBalance = async (): Promise<IBalance[] | null> => {
  const result = await Balance.find({});

  if (!result) {
    throw new apiError(400, 'Failed to added balance!');
  }

  return result;
};

export const balancerServices = {
  createBalance,
  getBalance,
};
