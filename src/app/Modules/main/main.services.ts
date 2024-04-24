import apiError from '../../../errors/apiError';
import { IMainBalance, IMainRMB, IProfit } from './main.interface';
import { MainBalance, Profit, RMB } from './main.model';

const createBalance = async (data: IMainBalance) => {
  const result = await MainBalance.create(data);

  if (!result) {
    throw new apiError(400, 'Failed to added balance!');
  }

  return result;
};

const createRMB = async (data: IMainRMB) => {
  const result = await RMB.create(data);

  if (!result) {
    throw new apiError(400, 'Failed to added balance!');
  }

  return result;
};
const getBalance = async () => {
  const result = await MainBalance.find({});

  if (!result) {
    throw new apiError(400, 'Failed to added balance!');
  }

  return result;
};
const getRMB = async () => {
  const result = await RMB.find({});

  if (!result) {
    throw new apiError(400, 'Failed to added balance!');
  }

  return result;
};

const getProfit = async () => {
  const result = await Profit.find({});

  if (!result) {
    throw new apiError(400, 'Failed to added balance!');
  }

  return result;
};

const createProfit = async (data: IProfit) => {
  const result = await Profit.create(data);

  if (!result) {
    throw new apiError(400, 'Failed to added Profit!');
  }

  return result;
};

export const balancerServices = {
  createBalance,
  getBalance,
  createRMB,
  getRMB,
  createProfit,
  getProfit,
};
