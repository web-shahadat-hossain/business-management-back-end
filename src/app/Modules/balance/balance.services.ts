import mongoose from 'mongoose';
import apiError from '../../../errors/apiError';
import { MainBalance } from '../main/main.model';
import { IBalance } from './balance.interface';
import { Balance } from './balance.modal';
import { UB } from '../user/user.model';

const createBalance = async (data: any): Promise<IBalance | null> => {
  const mainAmount = await MainBalance.find({});
  const userFind = await UB.findOne({ userName: data.userName });

  const balanceData = {
    fullName: data.fullName,
    mainBalance: data.mainBalance,
    message: data.message,
  };

  const amount = Number(mainAmount[0].mainBalance) + Number(data.mainBalance);

  const session = await mongoose.startSession();
  let result = null;

  try {
    session.startTransaction();

    await MainBalance.updateMany({ mainBalance: amount });
    await UB.updateOne(
      { userName: data.userName },
      { balance: Number(userFind?.balance) + Number(data.mainBalance) }
    );

    result = await Balance.create(balanceData);

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
