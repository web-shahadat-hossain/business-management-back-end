import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { buyServices } from './buy.services';

const createBuy = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await buyServices.createBuy(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Balance Added successfully!',
    data: result,
  });
});
const getBuy = catchAsync(async (req: Request, res: Response) => {
  const result = await buyServices.getBuy();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully!',
    data: result,
  });
});
const deleteBuy = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await buyServices.deleteBuy(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete Successfully!',
    data: result,
  });
});

export const buyController = {
  createBuy,
  getBuy,
  deleteBuy,
};
