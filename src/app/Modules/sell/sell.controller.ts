import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { sellServices } from './sell.services';

const createSell = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await sellServices.createSell(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'sell Added successfully!',
    data: result,
  });
});
const getSell = catchAsync(async (req: Request, res: Response) => {
  const result = await sellServices.getSell();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully!',
    data: result,
  });
});

export const sellController = {
  createSell,
  getSell,
};
