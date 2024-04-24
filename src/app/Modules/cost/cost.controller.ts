import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { costServices } from './cost.servies';

const createCost = catchAsync(async (req: Request, res: Response) => {
  const { ...data } = req.body;
  const result = await costServices.createCost(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Cost Balance Added successfully!',
    data: result,
  });
});
const getCost = catchAsync(async (req: Request, res: Response) => {
  const result = await costServices.getCost();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Successfully!',
    data: result,
  });
});

export const costController = {
  createCost,
  getCost,
};
