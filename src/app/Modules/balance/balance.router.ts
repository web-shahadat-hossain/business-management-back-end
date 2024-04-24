import express from 'express';
import { balancerController } from './balance.controller';

const router = express.Router();

router.post('/', balancerController.createBalance);
router.get('/', balancerController.getBalance);

export const balanceRouters = {
  router,
};
