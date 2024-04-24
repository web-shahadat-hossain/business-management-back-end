import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { balancerServices } from './main.services';

const createBalance = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await balancerServices.createBalance(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Balance Added successfully!',
    data: result,
  });
});

const getBalance = catchAsync(async (req: Request, res: Response) => {
  const result = await balancerServices.getBalance();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully!',
    data: result,
  });
});

const createRMB = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await balancerServices.createRMB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'RMB Added successfully!',
    data: result,
  });
});

const getRMB = catchAsync(async (req: Request, res: Response) => {
  const result = await balancerServices.getRMB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully!',
    data: result,
  });
});
const createProfit = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await balancerServices.createProfit(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profit Added successfully!',
    data: result,
  });
});

const getProfit = catchAsync(async (req: Request, res: Response) => {
  const result = await balancerServices.getProfit();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully!',
    data: result,
  });
});

export const balancerController = {
  createBalance,
  createRMB,
  getBalance,
  getRMB,
  createProfit,
  getProfit,
};
