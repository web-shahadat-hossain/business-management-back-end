import express from 'express';
import { balancerController } from './main.controller';

const router = express.Router();

router.post('/balance', balancerController.createBalance);
router.get('/balance', balancerController.getBalance);

router.post('/rmb', balancerController.createRMB);
router.get('/rmb', balancerController.getRMB);
router.post('/profit', balancerController.createProfit);
router.get('/profit', balancerController.getProfit);

export const mainRouters = {
  router,
};
