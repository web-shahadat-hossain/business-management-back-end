import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import { balancerServices } from './balance.services';
import sendResponse from '../../../shared/sendResponse';

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

export const balancerController = {
  createBalance,
  getBalance,
};
