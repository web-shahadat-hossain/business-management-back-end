import { Request, Response } from 'express';
import { userServices } from './user.services';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...user } = req.body;
  const result = await userServices.createUser(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User create successfully!',
    data: result,
  });
});

const createUserBalance = catchAsync(async (req: Request, res: Response) => {
  const { ...user } = req.body;
  const result = await userServices.createUserBalance(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Balance create successfully!',
    data: result,
  });
});
const getUserBalance = catchAsync(async (req: Request, res: Response) => {
  const result = await userServices.getUserBalance();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Balance get successfully!',
    data: result,
  });
});

export const userController = {
  createUser,
  createUserBalance,
  getUserBalance,
};
