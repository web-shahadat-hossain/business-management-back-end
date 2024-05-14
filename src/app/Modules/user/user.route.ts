import express from 'express';
import { userController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../../middleware/validateRequest';
const router = express.Router();

router.post(
  '/',
  validateRequest(UserValidation.createUserZodSchema),
  userController.createUser
);
router.post('/balance', userController.createUserBalance);
router.get('/balance', userController.getUserBalance);

export const userRouters = {
  router,
};
